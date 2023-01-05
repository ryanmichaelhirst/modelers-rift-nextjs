import {
  GetObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl as awsRequestPresigner } from '@aws-sdk/s3-request-presigner'
import { BUCKET_NAME, s3 } from 'lib/s3'

class AwsS3Service {
  public bucketName: string
  public client: S3Client

  constructor() {
    this.bucketName = BUCKET_NAME
    this.client = s3
  }

  uploadObject = async ({ data, key }: { data: any; key: string }) => {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Body: data,
      Key: key,
    })

    return await this.client.send(command)
  }

  listObjects = async ({ prefix, delimiter }: { prefix?: string; delimiter?: string }) => {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      ...(prefix && { Prefix: prefix }),
      ...(delimiter && { Delimiter: delimiter }),
    })

    return await this.client.send(command)
  }

  getSignedUrl = async ({ key, expiresIn }: { key: string; expiresIn?: number }) => {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    return await awsRequestPresigner(s3, command, { expiresIn })
  }

  getObject = async (key: string) => {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    return await (
      await this.client.send(command)
    ).Body
  }

  performOnAllObjects = async (
    callback: (result: ListObjectsV2CommandOutput) => Promise<void>,
    options: { prefix?: string; delimiter?: string } = {},
    next?: string,
  ): Promise<ListObjectsV2CommandOutput> => {
    const { prefix, delimiter } = options
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      ...(next && { ContinuationToken: next }),
      ...(delimiter && { Delimiter: delimiter }),
      ...(prefix && { Prefix: prefix }),
    })

    const response = await this.client.send(command)
    await callback(response)

    if (!response.NextContinuationToken) return response

    return await this.performOnAllObjects(callback, options, response.NextContinuationToken)
  }
}

export const awsS3Service = new AwsS3Service()
