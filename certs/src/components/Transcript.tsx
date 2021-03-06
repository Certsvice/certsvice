import { Col, Row, Text } from '@nextui-org/react'
import { Certificate } from 'src/types'
import Terms from './Terms'

type Props = {
  certificate: Certificate
}
export default function Transcript({ certificate }: Props) {
  const { data, issuer } = certificate
  const { transcript } = data
  return (
    <div
      style={{
        padding: '10px',
        border: '8px solid #44476a',
        height: '100%',
        width: '100%',
        color: '#44476a',
      }}
    >
      <Text size="1rem" weight="semibold">
        BIBLIOGRAPHY
      </Text>
      <div>
        <Row gap={1}>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                NAME:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.name}`}
              </Text>
            </Row>
          </Col>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                UNIVERSITY:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.university}`}
              </Text>
            </Row>
          </Col>
        </Row>
        <Row gap={1}>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                STUDENT ID:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.studentId}`}
              </Text>
            </Row>
          </Col>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                ADDMISSION DATE:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.addmissionDate}`}
              </Text>
            </Row>
          </Col>
        </Row>
        <Row gap={1}>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                IDENTIFICATION NUMBER:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.identificationNumber}`}
              </Text>
            </Row>
          </Col>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                GRADUATION DATE:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.graduationDate}`}
              </Text>
            </Row>
          </Col>
        </Row>
        <Row gap={1}>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                FACULTY:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.faculty}`}
              </Text>
            </Row>
          </Col>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                PROGRAM:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.program}`}
              </Text>
            </Row>
          </Col>
        </Row>
        <Row gap={1}>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                DEGREE:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.degree}`}
              </Text>
            </Row>
          </Col>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                DEGREE NAME:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.degreeName}`}
              </Text>
            </Row>
          </Col>
        </Row>
        <Row gap={1}>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                ISSUER:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${issuer.name}`}
              </Text>
            </Row>
          </Col>
          <Col>
            <Row gap={1}>
              <Text size="0.8rem" weight="semibold">
                ISSUED ON:
              </Text>
              <Text size="0.8rem" weight="normal">
                {` ${data.issuedOn}`}
              </Text>
            </Row>
          </Col>
        </Row>
      </div>
      {transcript && <Terms terms={transcript}></Terms>}
    </div>
  )
}
