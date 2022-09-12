import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import util from 'util'

util.inspect.defaultOptions.maxArrayLength = null

const PATREON_WEBHOOK_SECRET = 'tEfK-0GiT8l6pkD0C6MSnZd1fY2uMyLDhElOHfMOb0aDapiiSo7pA_xLmY95wlwI'

interface PatreonCampaign {
  attributes: {
    created_at: string
    creation_name: string
    discord_server_id: null
    google_analytics_id: null
    has_rss: boolean
    has_sent_rss_notify: boolean
    image_small_url: null
    image_url: null
    is_charged_immediately: boolean
    is_monthly: boolean
    is_nsfw: boolean
    main_video_embed: null
    main_video_url: null
    one_liner: null
    patron_count: 1
    pay_per_name: string
    pledge_url: string
    published_at: string
    rss_artwork_url: null
    rss_feed_title: null
    summary: string
    thanks_embed: null
    thanks_msg: null
    thanks_video_url: null
    url: string
    vanity: string
  }
  id: string
  type: 'campaign'
}

interface PatreonUser {
  attributes: {
    about: null
    created: string
    first_name: string
    full_name: string
    hide_pledges: boolean
    image_url: string
    is_creator: boolean
    last_name: string
    like_count: number
    social_connections: {
      deviantart: null
      discord: null
      facebook: null
      google: null
      instagram: null
      reddit: null
      spotify: null
      twitch: null
      twitter: null
      vimeo: null
      youtube: null
    }
    thumb_url: string
    url: string
    vanity: null
  }
  id: string
  type: 'user'
}

interface PatreonTier {
  attributes: {
    amount_cents: number
    created_at: string
    description: string
    discord_role_ids: null
    edited_at: string
    image_url: string
    patron_count: number
    post_count: number
    published: boolean
    published_at: string
    remaining: null
    requires_shipping: boolean
    title: string
    unpublished_at: null
    url: string
    user_limit: null
  }
  id: string
  type: 'tier'
}

interface PatreonEvent {
  data: {
    attributes: {
      campaign_lifetime_support_cents: number
      currently_entitled_amount_cents: number
      email: string
      full_name: string
      is_follower: boolean
      last_charge_date: string | null
      last_charge_status: string | null
      lifetime_support_cents: number
      next_charge_date: string | null
      note: string
      patron_status: 'active_patron' | 'former_patron'
      pledge_cadence: number
      pledge_relationship_start: string
      will_pay_amount_cents: number
    }
    id: string | null
    relationships: {
      address: { data?: null }
      campaign: {
        data: {
          id: string
          type: 'campaign'
        }
        links: {
          related: string
        }
      }
      currently_entitled_tiers: {
        data: { id: string; type: 'tier' }[]
      }
      user: {
        data: {
          id: string
          type: 'user'
        }
        links: {
          related: string
        }
      }
    }
    type: string
  }
  included: (PatreonCampaign | PatreonUser | PatreonTier)[]
  links: {
    self: string
  }
}

// https://github.com/vercel/next.js/discussions/12517#discussioncomment-2929922
// async function buffer(readable: Readable) {
//   const chunks = []
//   for await (const chunk of readable) {
//     chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
//   }

//   return Buffer.concat(chunks)
// }

// export const config = {
//   api: {
//     // disable body parsing so we can decrypt the original message
//     bodyParser: false,
//   },
// }

// https://www.patreon.com/portal/registration/register-webhooks
// https://docs.patreon.com/#webhooks
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const patreonEvent = req.headers['x-patreon-event']
  const patreonSig = req.headers['x-patreon-signature']

  // const buf = await buffer(req)
  // const rawBody = buf.toString('utf8')
  const body: PatreonEvent = req.body
  const bodyStr = JSON.stringify(body)
  const hex = crypto.createHmac('md5', PATREON_WEBHOOK_SECRET).update(bodyStr).digest('hex')

  console.log(`[TEST] - ${patreonEvent}`)
  console.log(util.inspect(body, { showHidden: false, depth: null, colors: true }))

  if (patreonSig !== hex) {
    console.log('sig not equal')
    res.status(400).send({ error: 'Request signature is unauthorized' })

    return
  }

  if (method !== 'POST') {
    console.log('method not post')
    res.status(405).send({ error: `Method ${method} not allowed` })

    return
  }

  switch (patreonEvent) {
    case 'members:create':
      if (body.data.attributes.will_pay_amount_cents > 100) {
        console.log('patron made a pledge of $1 or more!')
      }

      res.send(200)
      break
    case 'members:update':
      res.send(200)
      break
    case 'members:delete':
      res.send(200)
      break
    case 'members:pledge:create':
      res.send(200)
      break
    case 'members:pledge:update':
      res.send(200)
      break
    case 'members:pledge:delete':
      res.send(200)
      break
    default:
      res.status(400).send({ error: 'event not supported' })
  }
}
