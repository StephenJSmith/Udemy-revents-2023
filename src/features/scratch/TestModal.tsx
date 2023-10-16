import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { useAppSelector } from "../../app/store/store"

const TestModal = () => {
  const {data} = useAppSelector(state => state.modals);

  return (
    <ModalWrapper header={'Testing 123'}>
      <div>Test data is {data}</div>
    </ModalWrapper>
  )
}

export default TestModal;