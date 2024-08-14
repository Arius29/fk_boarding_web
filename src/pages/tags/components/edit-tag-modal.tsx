import { InputColorPicker } from '../../../components/common/form/input-color-picker'
import { InputFormLabel } from '../../../components/common/form/input-form-label'
import { Modal } from '../../../components/common/modal/modal'
import { Tag } from '../interfaces/Tag'
interface EditTagModalProps {
  handleToggle: () => void
  tag: Tag
}
export const EditTagModal = ({ handleToggle, tag }: EditTagModalProps) => {
  return (
    <Modal onClickOverlay={handleToggle}>
      <section className="w-96">
        <h3 className="text-2xl mb-1">Edit tag</h3>
        <h4 className="text-xs mb-4 text-gray-400">Change tag information</h4>
        <form action="" className="flex flex-col gap-3">
          <InputFormLabel
            id="name"
            name="name"
            label="Name"
            defaultValue={tag.name}
            autoComplete="off"
            InputContainerClassType="success"
          />
          <InputFormLabel
            id="description"
            name="description"
            label="Description"
            defaultValue={tag.description}
            autoComplete="off"
            InputContainerClassType="success"
          />

          <InputColorPicker
            defaultValue={tag.hexColor}
            label="Hex color"
            includeHex={true}
          />

          <div className="grid grid-cols-2 gap-5">
            <button className="w-full text-white bg-blue-550 rounded inline-block p-2 ring-0 outline-none hover:bg-blue-650 delay-0 duration-150 transition-colors ease-in-out focus:bg-blue-650 active:bg-blue-650">
              Save
            </button>
            <button
              type="button"
              className="w-full text-white bg-gray-400 rounded inline-block p-2 ring-0 outline-none hover:bg-gray-600 delay-0 duration-150 transition-colors ease-in-out focus:bg-gray-600 active:bg-gray-600"
              onClick={handleToggle}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </Modal>
  )
}
