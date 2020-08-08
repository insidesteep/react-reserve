import { useRouter } from 'next/router'
import { Container, Pagination } from 'semantic-ui-react'

function ProductPagination({ totalPage }) {
  const router = useRouter()

  return (
    <Container textAlign='center' style={{ margin: '2em' }}>
      <Pagination
        defaultActivePage={1}
        totalPages={totalPage}
        onPageChange={(event, data) => {
          if (data.activePage === 1) {
            router.push('/')
          } else {
            router.push(`/?page=${data.activePage}`)
          }
        }}
      />
    </Container>
  )
}

export default ProductPagination
