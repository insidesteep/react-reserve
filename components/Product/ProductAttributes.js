import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Header, Button, Modal } from 'semantic-ui-react'
import baseUrl from '../../utils/baseUrl'

function ProductAttributes({ description, _id, user }) {
  const [modal, setModal] = useState(false)
  const router = useRouter()

  const isRoot = user && user.role === 'root'
  const isAdmin = user && user.role === 'admin'
  const isRootOrAdmin = isRoot || isAdmin

  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const handleDelete = async () => {
    const url = `${baseUrl}/api/product`
    const payload = { params: { _id } }

    await axios.delete(url, payload)

    router.push('/')
  }

  return (
    <>
      <Header as='h3'>About this product</Header>
      <p>{description}</p>
      {isRootOrAdmin && (
        <>
          <Button
            color='red'
            icon='trash alternate outline'
            content='Delete Product'
            onClick={openModal}
          />
          <Modal dimmer='blurring' open={modal}>
            <Modal.Header content='Confirm Delete' />
            <Modal.Content>
              <p>Are you sure you want to delete this product?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button content='Cancel' onClick={closeModal} />
              <Button
                content='Delete'
                icon='trash'
                labelPosition='right'
                negative
                onClick={handleDelete}
              />
            </Modal.Actions>
          </Modal>
        </>
      )}
    </>
  )
}

export default ProductAttributes
