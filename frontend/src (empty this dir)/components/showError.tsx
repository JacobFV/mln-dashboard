import { showNotification } from "@mantine/notifications"
import { X } from "tabler-icons-react"

export default (message: string, title: string = 'Error') => {
  showNotification({
    title: title,
    message: message,
    color: 'red',
    icon: <X size={18} />
  })
}