import { createPortal } from 'react-dom'
import { ModalOverlay } from './modal-overlay'
import { ModalBody } from './modal-body'
interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onClickOverlay?: () => void
}
export const Modal = ({ onClickOverlay, children, ...props }: ModalProps) => {
  const root = document.getElementById('root')

  return root ? (
    createPortal(
      <>
        <div
          {...props}
          className={
            props.className ||
            'fixed top-0 left-0 w-full h-full grid place-items-center z-50'
          }
        >
          <ModalOverlay onClick={onClickOverlay} />
          <ModalBody>{children}</ModalBody>
        </div>
      </>,
      root
    )
  ) : (
    <></>
  )
}
