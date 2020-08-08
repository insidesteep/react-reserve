import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Header,
  Form,
  Input,
  TextArea,
  Message,
  Image,
  Button,
  Icon,
} from 'semantic-ui-react'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

const INITIAL_PRODUCT = {
  name: '',
  price: '',
  media: '',
  description: '',
}

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const isProduct = Object.values(product).every((el) => Boolean(el))

    isProduct ? setDisabled(false) : setDisabled(true)
  }, [product])

  const handleChange = (event) => {
    const { name, value, files } = event.target

    if (name === 'media') {
      setProduct({ ...product, media: files[0] })
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      setProduct({ ...product, [name]: value })
    }
  }

  const handleImageUpload = async () => {
    const data = new FormData()

    data.append('file', product.media)
    data.append('upload_preset', 'reactreserve')
    data.append('cloud_name', 'insidesteep')

    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = response.data.url

    return mediaUrl
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      setLoading(true)

      const mediaUrl = await handleImageUpload()

      const url = `${baseUrl}/api/product`
      const { name, price, description } = product
      const payload = { name, price, description, mediaUrl }

      const response = await axios.post(url, payload)
      console.log(response.data)

      setProduct(INITIAL_PRODUCT)
      setSuccess(true)
      setError('')
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header as='h2' block>
        <Icon name='add' color='orange' />
        Create New Product
      </Header>
      <Form
        loading={loading}
        success={success}
        error={Boolean(error)}
        onSubmit={handleSubmit}
      >
        <Message
          success
          icon='check'
          header='Success!'
          content='Your product has been posted'
        />
        <Message error header='Oops!' content={error} />
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='Name'
            placeholder='Name'
            name='name'
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            label='Price'
            name='price'
            type='number'
            placeholder='Price'
            min='0.00'
            step='0.01'
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            label='Media'
            name='media'
            type='file'
            accept='image/*'
            content='Select Image'
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} size='small' centered rounded />
        <Form.Field
          control={TextArea}
          label='Description'
          name='description'
          placeholder='Description'
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          type='submit'
          icon='pencil alternate'
          content='Submit'
          color='blue'
          disabled={disabled || loading}
        />
      </Form>
    </>
  )
}

export default CreateProduct
