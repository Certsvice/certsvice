import { Col, Row, Text } from '@nextui-org/react'
import { TranscriptEntity } from 'src/types'
import Course from './Course'

type Props = {
  terms: TranscriptEntity[]
}
export default function Terms({ terms }: Props) {
  return (
    <div className="flex flex-col w-full h-auto mt-3">
      <Text size="1rem" weight="semibold" className="headerRow">
        TRANSCRIPT
      </Text>
      <div>
        {terms.map((term) => {
          const { course } = term
          return (
            <div className="mb-2" key={term.name}>
              <Row gap={1}>
                <Col>
                  <Row gap={1}>
                    <Text size="0.8rem" weight="semibold">
                      NAME:
                    </Text>
                    <Text size="0.8rem" weight="normal">
                      {` ${term.name}`}
                    </Text>
                  </Row>
                </Col>
                <Col>
                  <Row gap={1}>
                    <Text size="0.8rem" weight="semibold">
                      SEMESTER:
                    </Text>
                    <Text size="0.8rem" weight="normal">
                      {` ${term.semester}`}
                    </Text>
                  </Row>
                </Col>
                <Col>
                  <Row gap={1}>
                    <Text size="0.8rem" weight="semibold">
                      CREDIT EARNED:
                    </Text>
                    <Text size="0.8rem" weight="normal">
                      {` ${term.creditsEarned}`}
                    </Text>
                  </Row>
                </Col>
                <Col>
                  <Row gap={1}>
                    <Text size="0.8rem" weight="semibold">
                      TOTAL CREDIT EARNED:
                    </Text>
                    <Text size="0.8rem" weight="normal">
                      {` ${term.totalCreditEarned}`}
                    </Text>
                  </Row>
                </Col>
              </Row>
              <Row gap={1}>
                <Col>
                  <Row gap={1}>
                    <Text size="0.8rem" weight="semibold">
                      GPA:
                    </Text>
                    <Text size="0.8rem" weight="normal">
                      {` ${term.gpa}`}
                    </Text>
                  </Row>
                </Col>
                <Col>
                  <Row gap={1}>
                    <Text size="0.8rem" weight="semibold">
                      GPAX:
                    </Text>
                    <Text size="0.8rem" weight="normal">
                      {` ${term.gpax}`}
                    </Text>
                  </Row>
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
              {course && <Course courses={course}></Course>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
