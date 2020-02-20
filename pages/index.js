import Layout from '../components/Layout'
import { LeftFeature, RightFeature } from '../components/Feature'
import Section from '../components/styles/Section'
import Page from '../components/Page'
import Hero from '../components/Hero'

const Index = () => (
  <Page>
    <Hero />
    <Layout>
      <Section>
        <LeftFeature />
      </Section>
      <Section>
        <RightFeature />
      </Section>
    </Layout>
  </Page>
)

export default Index