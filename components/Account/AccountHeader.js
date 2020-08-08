import { Segment, Header, Label, Icon } from 'semantic-ui-react'
import formatDate from '../../utils/formatDate'

function AccountHeader({ role, email, name, createdAt }) {
  return (
    <Segment color='violet' inverted secondary>
      <Label
        color='teal'
        size='large'
        ribbon
        icon='privacy'
        content={role}
        style={{ textTransform: 'capitalize' }}
      />
      <Header as='h1' icon textAlign='center' inverted>
        <Icon name='user' />
        {name}
        <Header.Subheader>{email}</Header.Subheader>
        <Header.Subheader>Joined {formatDate(createdAt)}</Header.Subheader>
      </Header>
    </Segment>
  )
}

export default AccountHeader
