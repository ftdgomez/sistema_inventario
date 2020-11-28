import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {

  return (
    pages > 1 && (
      <Pagination>

        <LinkContainer to={`/page/1`}>
          <Pagination.Item>
            <small><i className="im im-previous" style={{fontSize: 14}}></i></small>
          </Pagination.Item>
        </LinkContainer>  

        <LinkContainer to={`/page/${page - 1}`}>
          <Pagination.Item>
            <small><i className="im im-care-left" style={{fontSize: 14}}></i></small>
          </Pagination.Item>
        </LinkContainer>


        <LinkContainer to={`/page/${page}`}>
          <Pagination.Item active={true}>{page}</Pagination.Item>
        </LinkContainer>

        <LinkContainer to={`/page/${page + 1}`}>
          <Pagination.Item>
            <small><i className="im im-care-right" style={{fontSize: 14}}></i></small>
          </Pagination.Item>
        </LinkContainer>

        <LinkContainer to={`/page/${pages}`}>
          <Pagination.Item>
            <small><i className="im im-next" style={{fontSize: 14}}></i></small>
          </Pagination.Item>
        </LinkContainer>  

{/*         {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))} */}
      </Pagination>
    )
  )
}

export default Paginate
