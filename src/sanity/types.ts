export type PortableContent = Array<{
  _key?: string;
  _type: string;
  [key: string]: unknown;
}>;

export type CmsImage = {
  _type?: "image";
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string;
  };
  alt?: string;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type ArtworkRecord = {
  _id: string;
  title: string;
  slug: string;
  artist: string;
  year?: number;
  medium?: string;
  featured?: boolean;
  image?: CmsImage;
  localImage?: string;
  description?: PortableContent;
  descriptionText?: string;
};

export type JournalPostRecord = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: CmsImage;
  localImage?: string;
  body?: PortableContent;
  fallbackBody?: string[];
};

export type SiteSettingsRecord = {
  title?: string;
  description?: string;
};
