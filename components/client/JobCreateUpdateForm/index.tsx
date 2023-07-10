"use client"
import './styles.css';
import { validate } from './validation';
import { useState } from 'react';
import { endpoints } from '../../utils/endpoints';
import type { Job, JobObj, Skill, JobSkills } from '../../../src/app/api/utils/types';
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
    jobToEdit?: Job,
    edit?: boolean,
    prepareToast: (msg: string, type: "success" | "danger" | "warning" | "dark") => void,
    fetch: () => void
}

const api = new API();



export default function JobCreateUpdateForm(props: JobCreateUpdateFormProps) {
    // TODO: this needs refactoring
    let initialObject = {
        jobTitle: '',
        jobDescription: '',
        skillIds: [],
        initialSalaryRange: 3000,
        finalSalaryRange: 5000,
        companyName: '',
        jobLocation: ''
    } as JobObj;
    let initialSkill = [] as Skill[];
    if (props.jobToEdit !== undefined) {  // Check if 'props.jobToEdit' is not undefined
        initialObject.jobTitle = props.jobToEdit.jobTitle;
        initialObject.jobDescription = props.jobToEdit.jobDescription;
        initialObject.initialSalaryRange = props.jobToEdit.initialSalaryRange;
        initialObject.finalSalaryRange = props.jobToEdit.finalSalaryRange;
        initialObject.companyName = props.jobToEdit.companyName;
        initialObject.jobLocation = props.jobToEdit.jobLocation;
        initialObject.skillIds = props.jobToEdit.jobSkills.map(jobS => jobS.skill.id);
        initialObject.id = props.jobToEdit.id;
        initialSkill = props.jobToEdit.jobSkills.map(jobS => jobS.skill);
        initialSkill = props.jobToEdit.jobSkills?.map((jobS: JobSkills) => jobS.skill) || [];
    }
    const [validated, setValidated] = useState(false);
    const [selectedSkills, setSkillList] = useState(initialSkill as Skill[])
    const [createJobObject, setCreateJobObject] = useState(initialObject as JobObj)
    const addSkill = (el: any) => {
        if (el.target.value !== 'Choose Skill') {
            const selected: Skill = JSON.parse(el.target.value);
            const assertion = selectedSkills.map(slected => slected.id == selected.id).includes(true)
            if (!assertion) {
                const skillList = structuredClone(selectedSkills)
                skillList.push(selected);
                setSkillList(skillList);
            }
        }
    }

    const onchangeInput = (event: any, key: string) => {
        let newCreateJobObj = structuredClone(createJobObject);
        (newCreateJobObj as any)[key] = event.target.value;
        if (key === 'initialSalaryRange' || key === 'finalSalaryRange') {
            (newCreateJobObj as any)[key] = parseFloat(event.target.value);
        }
        setCreateJobObject(newCreateJobObj);
    }

    const handleSubmit = async (event: any) => {
        try {
            let postObj = structuredClone(createJobObject)
            postObj.skillIds = selectedSkills.map(skill => skill.id)
            const { valid, msg, tType } = validate(postObj)
            if (valid) {
                const hostname = 'http://' + window.location.host;
                if (Object.keys(createJobObject).includes('id')) {
                    const response = await api.instance.patch(`${hostname}${endpoints.createJobs}`, postObj);
                    if (response.status < 250) {
                        props.prepareToast(`Updated Job: ${createJobObject.jobTitle}`, 'success')
                        props.closeHandler()
                        props.fetch()
                    } else {
                        props.prepareToast(`Error while creating`, 'danger')
                    }
                } else {
                    const response = await api.instance.post(`${hostname}${endpoints.createJobs}`, postObj);
                    if (response.status < 250) {
                        props.prepareToast(`Created Job: ${createJobObject.jobTitle}`, 'success')
                        props.closeHandler()
                        props.fetch()
                    } else {
                        props.prepareToast(`Error while updating`, 'danger')
                    }
                }
                
            } else {
                props.prepareToast(msg, tType)
            }
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
                                placeholder={'Web application'}
                                defaultValue={props.jobToEdit ? props.jobToEdit.jobTitle : ''}
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
                                placeholder={'This web application requires ...'}
                                defaultValue={props.jobToEdit ? props.jobToEdit.jobDescription : ''}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="selectedSkill">
                            <Form.Label>Skills</Form.Label>
                            <Form.Select onSelect={addSkill} onChange={addSkill} placeholder='Choose Skill'>
                                <option key="disabled">Choose Skill</option>
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
                                    placeholder={'3000'}
                                    defaultValue={props.jobToEdit ? props.jobToEdit.initialSalaryRange : 0}
                                />
                                <Form.Control
                                    onChange={e => onchangeInput(e, 'finalSalaryRange')}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    type="number"
                                    aria-label="Final"
                                    placeholder={'5000'}
                                    defaultValue={props.jobToEdit ? props.jobToEdit.finalSalaryRange : 5000}
                                />
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
                                    defaultValue={props.jobToEdit ? props.jobToEdit.companyName : ''}
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
                                placeholder={'Brazil'}
                                defaultValue={props.jobToEdit ? props.jobToEdit.jobLocation : ''}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Col>
            </Row>
            <Button variant="primary" onClick={handleSubmit} style={{ float: 'right' }}>Submit!</Button>
            <Button variant="secondary" onClick={props.closeHandler} >Close</Button>
        </Form>
    );
}