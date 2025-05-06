import useEmblaCarousel, {
  type UseEmblaCarouselType
} from 'embla-carousel-react'

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>

export type CarouselApi = UseEmblaCarouselType[1]
export type CarouselOptions = UseCarouselParameters[0]
export type CarouselPlugin = UseCarouselParameters[1]
