import { useRouter } from 'next/router'
import {
  Segment,
  Header,
  Label,
  Icon,
  Accordion,
  List,
  Button,
  Image,
} from 'semantic-ui-react'
import formatDate from '../../utils/formatDate'

function AccountOrders({ orders }) {
  const router = useRouter()

  const mapOrdersToPanels = (orders) => {
    return orders.map((order) => ({
      key: order._id,
      title: {
        content: <Label color='blue' content={formatDate(order.createdAt)} />,
      },
      content: {
        content: (
          <>
            <List.Header as='h3'>
              Total: ${order.total}
              <Label
                icon='mail'
                content={order.email}
                horizontal
                basic
                style={{ margin: '1em' }}
              />
            </List.Header>
            <List>
              {order.products.map((p) => (
                <List.Item key={p._id}>
                  <Image avatar src={p.product.mediaUrl} />
                  <List.Content>
                    <List.Header>{p.product.name}</List.Header>
                    <List.Description>
                      {p.quantity} * ${p.product.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated='right'>
                    <Label tag color='red' size='tiny'>
                      {p.product.sku}
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </>
        ),
      },
    }))
  }

  return (
    <>
      <Header as='h2'>
        <Icon name='folder open' />
        Order History
      </Header>
      {orders.length === 0 ? (
        <Segment textAlign='center' tertiary inverted color='grey'>
          <Header icon>
            <Icon name='copy outline' />
            No past orders.
          </Header>
          <div>
            <Button color='orange' onClick={() => router.push('/')}>
              View products
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion
          styled
          fluid
          exclusive={false}
          panels={mapOrdersToPanels(orders)}
        />
      )}
    </>
  )
}

export default AccountOrders
