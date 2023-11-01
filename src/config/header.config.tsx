import { ReactNode } from "react";
import { ROUTING } from "./routing.config";

type HeaderItem = {
  href: ROUTING,
  title: string,
  icon: ReactNode
}

export const HEADER: HeaderItem[] = [
  {href: ROUTING.MESSAGES, title: 'Сообщения', icon: <p></p>},
  {href: ROUTING.SEARCH, title: 'Поиск', icon: <p></p>},
  {href: ROUTING.PROFILE, title: 'Профиль', icon: <p></p>},
  {href: ROUTING.SETTINGS, title: 'Настройки', icon: <p></p>}
]


