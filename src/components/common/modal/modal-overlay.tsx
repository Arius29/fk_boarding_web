interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalOverlay = ({ ...props }: ModalOverlayProps) => {
  return (
    <section
      {...props}
      className="bg-black opacity-50 absolute inset-0 z-40"
    ></section>
  )
}
