import { Card, Col, Grid, Link, Button, Row, Text } from '@nextui-org/react'
import { PageHeader, Tabs, Statistic, Descriptions, Result } from 'antd'
import Content from 'src/components/Content'
import { ContentProps } from 'src/types'

export default function Certificate() {
  return (
    <>
      <PageHeader
        className="site-page-header-responsive !bg-white"
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        // extra={[
        //   <Button key="3">Operation</Button>,
        //   <Button key="2">Operation</Button>,
        //   <Button key="1" type="primary">
        //     Primary
        //   </Button>,
        // ]}
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane tab="Details" key="1" />
            <TabPane tab="Rule" key="2" />
          </Tabs>
        }
      >
        <Card cover css={{ w: '100%' }}>
          <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
            <Col>
              <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                New
              </Text>
              <Text h3 color="black">
                Acme camera
              </Text>
            </Col>
          </Card.Header>
          <Card.Body>
            <Card.Image src="/pre-booking-panasonic-lumix-gh6-mo.jpg" height={400} width="100%" alt="Card example background" />
          </Card.Body>
          <Card.Footer
            blur
            css={{
              position: 'absolute',
              bgBlur: '#ffffff',
              borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Row>
              <Col>
                <Text color="#000" size={12}>
                  Available soon.
                </Text>
                <Text color="#000" size={12}>
                  Get notified.
                </Text>
              </Col>
              <Col>
                <Row justify="flex-end">
                  <Button flat auto rounded color="secondary">
                    <Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
                      Notify Me
                    </Text>
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>

        <ExtraContent extra={extraContent}>{renderContent()}</ExtraContent>
      </PageHeader>
      <Content className=" bg-white">
        <div className=" h-auto bg-slate-500 w-full">
          <Result
            status="success"
            title="Certificate issued by"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            // extra={[
            //   <Button type="primary" key="console">
            //     Go Console
            //   </Button>,
            //   <Button key="buy">Buy Again</Button>,
            // ]}
          />
        </div>
      </Content>
    </>
  )
}

const { TabPane } = Tabs
const renderContent = (column = 2) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
    <Descriptions.Item label="Association">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="Remarks">Gonghu Road, Xihu District, Hangzhou, Zhejiang, China</Descriptions.Item>
  </Descriptions>
)

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
    <Statistic
      title="Status"
      value="Pending"
      style={{
        marginRight: 32,
      }}
    />
    <Statistic title="Price" prefix="$" value={568.08} />
  </div>
)

const ExtraContent = ({ children, extra }: ContentProps) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
)
