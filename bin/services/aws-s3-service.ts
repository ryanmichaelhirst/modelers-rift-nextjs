import {
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
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

  listObjects = async () => {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
    })

    return await this.client.send(command)
  }

  performOnAllObjects = async (
    callback: (result: ListObjectsV2CommandOutput) => Promise<void>,
    delimiter?: string,
    next?: string,
  ): Promise<ListObjectsV2CommandOutput> => {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      ...(next && { ContinuationToken: next }),
      ...(delimiter && { Delimiter: delimiter }),
    })

    const response = await this.client.send(command)
    await callback(response)

    if (!response.NextContinuationToken) return response

    return await this.performOnAllObjects(callback, delimiter, response.NextContinuationToken)
  }
}

export const awsS3Service = new AwsS3Service()
