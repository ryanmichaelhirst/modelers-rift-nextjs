declare module '*.png'
declare module '*.svg'
declare module '*.glb' {
  const value: any
  export default value
}

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
      email: string | null
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
