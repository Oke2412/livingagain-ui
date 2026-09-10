export type SpaceId = 'daily-fast' | 'daily-deep' | 'rewind-fast' | 'rewind-deep'

export interface Space {
  id: SpaceId
  index: string
  code: string
  title: string
  subtitle: string
  prompt: string
  color: string
  glow: string
  chamber: string
}

export const SPACES: Space[] = [
  {
    id: 'daily-fast',
    index: '01',
    code: 'DAILY.FAST',
    title: 'Nhật ký Nhanh',
    subtitle: 'Cập nhật ngắn trong ngày',
    prompt: 'Kể nhanh một khoảnh khắc vừa xảy ra.',
    color: '#dad6ce',
    glow: 'rgba(218, 214, 206, 0.30)',
    chamber: 'rgba(218, 214, 206, 0.10)',
  },
  {
    id: 'daily-deep',
    index: '02',
    code: 'DAILY.DEEP',
    title: 'Tự sự Ngày sâu',
    subtitle: 'Những chiêm nghiệm buổi tối dài',
    prompt: 'Thở ra. Kể lại trọn vẹn ngày hôm nay.',
    color: '#9cc6dd',
    glow: 'rgba(156, 198, 221, 0.34)',
    chamber: 'rgba(156, 198, 221, 0.12)',
  },
  {
    id: 'rewind-fast',
    index: '03',
    code: 'REWIND.FAST',
    title: 'Hồi ký Nhanh',
    subtitle: 'Những cột mốc ký ức then chốt',
    prompt: 'Một mốc ký ức bất chợt hiện về.',
    color: '#c1b2d4',
    glow: 'rgba(193, 178, 212, 0.34)',
    chamber: 'rgba(193, 178, 212, 0.12)',
  },
  {
    id: 'rewind-deep',
    index: '04',
    code: 'REWIND.DEEP',
    title: 'Hồi ký Sâu lắng',
    subtitle: 'Độc thoại tiểu sử sâu thẳm',
    prompt: 'Kể lại như đang viết một chương đời.',
    color: '#eddcc6',
    glow: 'rgba(237, 220, 198, 0.34)',
    chamber: 'rgba(237, 220, 198, 0.12)',
  },
]

export const getSpace = (id: SpaceId) => SPACES.find((s) => s.id === id)!
