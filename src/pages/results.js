import React from 'react'
import { Link } from 'gatsby'
import { useSearch } from '../components/search'
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
} from '@umich-lib/core'
import SEO from "../components/seo"

function Catalog() {
  const inBrowser = typeof window !== `undefined`

  return (
    <React.Fragment>
      <Link to="/">Home</Link>
      {inBrowser && (<Results />)}
    </React.Fragment>
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

function Result({ uid }) {
  const [{ records }] = useSearch()
  const { names, datastore, ...metadata } = records[uid]

  return (
    <div css={{
      borderBottom: `solid 1px ${COLORS.neutral[100]}`,
      paddingBottom: SPACING['M'],
      marginBottom: SPACING['M']
    }} role="region" aria-label="result">
      <a
        href={`https://search.lib.umich.edu/${metadata_key[datastore].slug}/record/${metadata.uid}`}
        css={{
          fontWeight: '600',
          ...TYPOGRAPHY['XS'],
          textDecoration: 'none',
          boxShadow: `inset 0px -1px ${COLORS.teal['400']}`,
          ':hover': {
            boxShadow: `inset 0px -2px ${COLORS.teal['400']}`
          }
        }}
      >{names}</a>

      <Metadata uid={uid} />
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
            marginTop: SPACING['XL']
          }}
        >
          {results && results['mirlyn'] && (
            <ul>
              {results['mirlyn'].map(r_uid => (
                <li key={r_uid}>
                  <Result uid={r_uid} />
                </li>
              ))}
            </ul>
          )}
        </ul>
      </section>
    </Margins>
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

export default Catalog