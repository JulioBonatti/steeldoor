"use client"
import './styles.css';
import { useState } from 'react';
import { endpoints } from '../../utils/endpoints';
import type { Job, Skill } from '../../../src/app/api/utils/types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import SkillsBadges from '../../server/SkillsBadges';
import API from '../../../src/app/api/utils/api';


type JobCreateUpdateFormProps = {
    skills: Skill[],
    closeHandler: any,
    jobToEdit: Job | boolean,
    edit?: boolean
}

type JobObj = {
    id?: string,
    companyName: string,
    jobLocation: string,
    jobTitle: string,
    jobDescription: string,
    initialSalaryRange: number,
    finalSalaryRange: number,
    skillIds: string[],
}

const api = new API();

export default function JobCreateUpdateForm(props: JobCreateUpdateFormProps) {
    console.log(props.jobToEdit)
    let initialObject = {
        jobTitle: 'Web application',
        jobDescription: 'This web application requires ...',
        skillIds: [],
        initialSalaryRange: 3000,
        finalSalaryRange: 5000,
        companyName: 'Web application',
        jobLocation: 'Brazil'
    } as JobObj;
    let initialSkill = [] as Skill[];
    if (typeof props.jobToEdit != 'boolean') {
        initialObject.jobTitle = props.jobToEdit.jobTitle;
        initialObject.jobDescription = props.jobToEdit.jobDescription;
        initialObject.initialSalaryRange = props.jobToEdit.initialSalaryRange;
        initialObject.finalSalaryRange = props.jobToEdit.finalSalaryRange;
        initialObject.companyName = props.jobToEdit.companyName;
        initialObject.jobLocation = props.jobToEdit.jobLocation;
        initialObject.skillIds = props.jobToEdit.jobSkills.map(jobS => jobS.skill.id);
        initialObject.id = props.jobToEdit.id;
        initialSkill = props.jobToEdit.jobSkills.map(jobS => jobS.skill);
    }
    const [validated, setValidated] = useState(false);
    const [selectedSkills, setSkillList] = useState(initialSkill as Skill[])
    const [createJobObject, setCreateJobObject] = useState(initialObject as JobObj)

    const addSkill = (el: any) => {
        const selected: Skill = JSON.parse(el.target.value);
        const assertion = selectedSkills.map(slected => slected.id == selected.id).includes(true)
        if (!assertion) {
            const skillList = structuredClone(selectedSkills)
            skillList.push(selected);
            setSkillList(skillList);
        }
    }

    const onchangeInput = (event: any, key: string) => {
        let newCreateJobObj = structuredClone(createJobObject);
        newCreateJobObj[key] = event.target.value;
        if (key === 'initialSalaryRange' || key === 'finalSalaryRange') {
            console.log('ta entrando aqui?', key)
            newCreateJobObj[key] = parseFloat(event.target.value);
        }
        
        setCreateJobObject(newCreateJobObj);
        console.log(newCreateJobObj);
    }

    const handleSubmit = async (event: any) => {
        // TODO: Needs to validate salary initial < final
        // TODO: maybe validade existence of selected skills    
        try {
            let postObj = structuredClone(createJobObject)
            postObj.skillIds = selectedSkills.map(skill => skill.id)
            const hostname = 'http://' + window.location.host;
            if (Object.keys(createJobObject).includes('id')) {
                const response = await api.instance.patch(`${hostname}${endpoints.createJobs}`, postObj);
                console.log('patch');
            } else {
                const response = await api.instance.post(`${hostname}${endpoints.createJobs}`, postObj);
            }
            props.closeHandler()
            window.location.reload();
            // TODO: toast to indicate creation
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form noValidate validated={validated} >
            <Row style={{ marginBottom: '20px' }}>
                <Col >
                    <Row>
                        <Form.Group controlId="jobTitle">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                onChange={e => onchangeInput(e, 'jobTitle')}
                                required
                                type="text"
                                placeholder="Web application"
                                defaultValue="Web application"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="jobDescription">
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control
                                onChange={e => onchangeInput(e, 'jobDescription')}
                                as="textarea"
                                required
                                type="text"
                                placeholder="This web application requires ..."
                                defaultValue="This web application requires ..."
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="selectedSkill">
                            <Form.Label>Skills</Form.Label>
                            <Form.Select onSelect={addSkill} onChange={addSkill}>
                                {props.skills.map(skill => {
                                    return (
                                        <option key={skill.skillName} value={JSON.stringify(skill)}>{skill.skillName}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                        <SkillsBadges skills={props.skills} setHandler={setSkillList} selectedSkills={selectedSkills} />
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Form.Group controlId="Salary Range" className="mb-3">
                            <Form.Label>{'Salary Range'}</Form.Label>
                            <Row>
                                <div >
                                    <label className='sub-label' >Initial</label>
                                    <label className='sub-label' style={{ float: 'right' }} >Final</label>
                                </div>
                            </Row>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    onChange={e => onchangeInput(e, 'initialSalaryRange')}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    type="number"
                                    aria-label="Initial"
                                    placeholder="3000" />
                                <Form.Control
                                    onChange={e => onchangeInput(e, 'finalSalaryRange')}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    type="number"
                                    aria-label="Final"
                                    placeholder="5000" />
                                <Form.Control.Feedback>OK!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Only numbers accepted
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    onChange={e => onchangeInput(e, 'companyName')}
                                    type="text"
                                    placeholder="Company Name"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Company Name.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '10px' }} >
                        <Form.Group controlId="jobLocation">
                            <Form.Label>Job Location</Form.Label>
                            <Form.Control
                                onChange={e => onchangeInput(e, 'jobLocation')}
                                required
                                type="text"
                                placeholder="Job Location"
                                defaultValue="Brazil"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Col>
            </Row>
            <Button variant="primary" onClick={handleSubmit} style={{ float: 'right' }}>Create Job</Button>
            <Button variant="secondary" onClick={props.closeHandler} >Close</Button>
        </Form>
    );
}