import { Col, Row, Text } from '@nextui-org/react'
import { CourseEntity } from 'src/types'

type Props = {
  courses: CourseEntity[]
}
export default function Course({ courses }: Props) {
  return (
    <div className="flex flex-col w-full h-auto ml-10 mb-3">
      <div>
        <Text size="0.8rem" weight="semibold">
          TRANSCRIPT
        </Text>
        <Row gap={3}>
          <Col>
            <Text size="0.8rem" weight="semibold">
              COURSE CODE
            </Text>
          </Col>
          <Col>
            <Text size="0.8rem" weight="semibold">
              COURSE NAME
            </Text>
          </Col>
          <Col>
            <Text size="0.8rem" weight="semibold">
              CREDIT
            </Text>
          </Col>
          <Col>
            <Text size="0.8rem" weight="semibold">
              GRADE
            </Text>
          </Col>
        </Row>
        {courses.map((course) => {
          return (
            <div key={course.courseCode}>
              <Row gap={3}>
                <Col>
                  <Text size="0.8rem" weight="normal">
                    {course.courseCode}
                  </Text>
                </Col>
                <Col>
                  <Text size="0.8rem" weight="normal">
                    {course.courseName}
                  </Text>
                </Col>
                <Col>
                  <Text size="0.8rem" weight="normal">
                    {course.credit}
                  </Text>
                </Col>
                <Col>
                  <Text size="0.8rem" weight="normal">
                    {course.grade}
                  </Text>
                </Col>
              </Row>
            </div>
          )
        })}
      </div>
    </div>
  )
}
