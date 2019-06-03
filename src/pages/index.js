import React, { useState } from "react"
import {
  Margins,
  Heading,
  TextInput,
  Button,
  SPACING,
  MEDIA_QUERIES,
  Icon,
  COLORS,
  TYPOGRAPHY,
  Link
} from '@umich-lib/core'

import { useSearch } from '../components/search'
import Layout from "../components/layout"
import SEO from "../components/seo"

function IndexPage() {
  const inBrowser = typeof window !== `undefined`

  return (
    <Layout>
      <SEO keywords={[`University of Michigan Library`, `Search`, `Catalog`]} />
      {inBrowser && (
        <SearchContainer />
      )}
    </Layout>
  )
}

function SearchContainer() {
  const [{ results }, dispatch] = useSearch()

  return (
    <React.Fragment>
      <SearchBox />
      {results && (
        <Results />
      )}
    </React.Fragment>
  )
}

function SearchBox() {
  const [{ query, status }, dispatch] = useSearch()

  return (
    <div>
      <Margins>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            dispatch({
              type: 'setSearchRequested',
              searchRequested: true
            })
          }}
          css={{
            width: '100%',
            maxWidth: '42rem',
            margin: '0 auto',
            padding: `${SPACING['M']} 0`,
            marginTop: status === 'searching' ? 0 : '33vh',
            background: 'white'
          }}
          role="search"
        >
          <div css={{
            display: 'flex',
            'input': {
              height: '100%',
              borderColor: COLORS.neutral['300']
            }
          }}>
            <TextInput
              id="search-query"
              labelText="query"
              type="search"
              hideLabel
              name="query"
              value={query}
              onChange={(e) => {
                dispatch({ type: 'setQuery', query: e.target.value })
              }}
            />
            <Button type="submit" css={{
              whiteSpace: 'nowrap',
              marginLeft: SPACING['XS']
            }}><Icon icon="search"/> Search</Button>
          </div>
        </form>
      </Margins>
    </div>
  )
}

function Results() {
  const [
    {
      datastores,
      results,
    }] = useSearch()

  return (
    <Margins>
      <section aria-label="results">
        <ul 
          css={{
            marginTop: SPACING['XL'],
            [MEDIA_QUERIES.LARGESCREEN]: {
              columns: '3',
              columnGap: SPACING['XL'],
            }
          }}
        >
          {Object.keys(datastores).map(d_uid => {
            return (
              <li
                key={d_uid}
                css={{
                  breakInside: 'avoid',
                  marginBottom: SPACING['2XL'],
                  minHeight: results && results[d_uid] ? 'none' : '28rem'
                }}
                role="section"
                aria-labelledby={d_uid + "-results"}
              >
                <Heading size="L" level={2} id={d_uid + "-results"} css={{
                  marginBottom: SPACING['M']
                }}>{metadata_key[d_uid].name}</Heading>

                {results && results[d_uid] && (
                  <ul>
                    {results[d_uid].slice(0, 3).map(r_uid => (
                      <li key={r_uid}>
                        <ResultPreview uid={r_uid} />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          }
            
          )}
        </ul>
      </section>
    </Margins>
  )
}

const metadata_key = {
  'mirlyn': {
    name: 'Catalog',
    slug: 'catalog'
  },
  'journals': {
    name: 'Online Journals',
    slug: 'onlinejournals'
  },
  'articlesplus': {
    name: 'Articles',
    slug: 'articles'
  },
  'website': {
    name: "Website",
    slug: 'website'
  },
  'databases': {
    name: "Databases",
    slug: 'databases'
  }
}

function ResultPreview({ uid }) {
  const [{ records }] = useSearch()
  const { names, datastore, ...metadata } = records[uid]

  return (
    <div css={{
      borderBottom: `solid 1px ${COLORS.neutral[100]}`,
      paddingBottom: SPACING['M'],
      marginBottom: SPACING['M']
    }}>
      <Link
        href={`https://search.lib.umich.edu/${metadata_key[datastore].slug}/record/${metadata.uid}`}
        css={{ fontSize: '1.15rem', fontWeight: '600' }}
      >{names}</Link>

      <Metadata uid={uid} />
    </div>
  )
}

function Metadata({ uid }) {
  const [{ records }] = useSearch()
  const { fields } = records[uid]

  const data = fields.filter(({uid}) => [
    'brief_description',
    'author',
    'format',
    'type'
  ].includes(uid))

  return (
    <dl aria-label="metadata">
      {data.map(({ name, value }) => <MetadataField name={name} value={value} /> )}
    </dl>
  )
}

function MetadataField({ name, value }) {
  function renderField(n, v) {
    return (
      <React.Fragment>
        <dt css={{
          ...TYPOGRAPHY['3XS'],
          marginTop: SPACING['XS']
        }}>{n}</dt>
        {v.map(item => <dd>{item.slice(0, 120)}</dd>)}
      </React.Fragment>
    )
  }
  if (Array.isArray(value)) {
    return renderField(name, value.slice(0, 3))
  }

  return renderField(name, [].concat(value))
}

export default IndexPage
