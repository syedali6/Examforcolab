import { useState } from 'react'
import './App.css'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { MdArrowBackIos } from "react-icons/md";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import { GiPlainCircle } from "react-icons/gi";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TiMinus } from "react-icons/ti";
// import "../proxy.cjs"
function UIdesgin() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [rowCount, setRowCount] = useState([]);
  console.log(rowCount)
  const schemaOptions = [
    { label: 'Add schema to segment', value: '' },
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const handleAddRow = () => {
    if (selectedSchema) {
      // Add the selected schema value to the rowCount state
      setRowCount(prevRowCount => [...prevRowCount, selectedSchema.value]);
      setSelectedSchema(null);
    }
  };

  const handleSaveSegment = async () => {
    const segmentData = {
      segment_name: segmentName,
      schema: rowCount.map((schemaValue) => ({ [schemaValue]: schemaOptions.find((option) => option.value === schemaValue).label }))
    };
  
    console.log(segmentData);
    // Your fetch request
    fetch('https://webhook.site/4646f2ef-9ef5-45a3-8ce6-8357840b8559', {
      method: 'POST',
      headers: {
        'Api-Key': '4646f2ef-9ef5-45a3-8ce6-8357840b8559',
        'Content-Type': 'UIdesginlication/json',
      },
      body: JSON.stringify(segmentData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Webhook response:', responseData);
      })
      .catch((error) => {
        console.error('Error sending data to webhook:', error.message);
      });

  };
  
  const handleRemoveRow = (index) => {
    console.log(index)
    setRowCount(prevRowCount => prevRowCount.filter((_, i) => i !== index));
  };


  const handleSchemaChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = schemaOptions.find((option) => option.value === selectedValue);
    setSelectedSchema(selectedOption);
  };
  return (
    <>
      <div>
        <div className='p-3 bgcolorset'>
          <div className='d-flex gap-2 align-items-center  '>
            <div>
              <MdArrowBackIos color='white' />
            </div>
            <div>
              <h5 className='text-white m-0'>View Audience</h5>
            </div>
          </div>
        </div>
        <div>
          <div className='h-100'>
            <Button variant="outline-secondary" onClick={handleShow}>Save Segmnet</Button>
          </div>
        </div>

        <Offcanvas placement={'end'} show={show} onHide={handleClose} backdrop="static">
          <Offcanvas.Header className='bgcolorset' closeButton>
            <Offcanvas.Title className='text-white'>
              <div className='d-flex gap-2 align-items-center  '>
                <div>
                  <MdArrowBackIos color='white' />
                </div>
                <div>
                  <h4 className='m-0'>Saving Segment</h4>
                </div>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className='p-3'>
              <Form>
                <div>
                  <Form.Label htmlFor="segmentname" className='fw-bold'>Enter the Name of the Segment</Form.Label>
                  <Form.Control
                  className='my-3'
                    type="text"
                    id="segmentname"
                    placeholder='Name of the segment'
                    value={segmentName}
                    onChange={(e) => setSegmentName(e.target.value)}
                  />
                </div>
                <div>
                  <p className='fw-bold'>To save your segment, you need to add the Schemas to build the query</p>
                </div>
                <div>
                  <div className='d-flex justify-content-end gap-2 p-3'>
                    <div>
                      <GiPlainCircle color='green' /> - User Traits
                    </div>
                    <div>
                      <GiPlainCircle color='red' /> - Group Traits
                    </div>
                  </div>

                  <div className={rowCount.length >0?'borderset':''}>
                    {rowCount.map((data, index) => (
                      <Row key={index} className='align-items-center my-3'>
                        <Col lg={1} md={1} sm={1} className='text-end pe-0'>
                          <div>
                            <GiPlainCircle color='green' />
                          </div>
                        </Col>
                        <Col lg={9} md={9} sm={9}>
                          <Form.Select
                            id={`dropdown-${index}`}
                            aria-label="Default select example"
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedOption = schemaOptions.find((option) => option.value === selectedValue);
                              setSelectedSchema(selectedOption);
                            }}
                          >
                            {schemaOptions.map((option, optionIndex) => (
                              <option key={optionIndex} value={option.value} selected={option.value === data} >
                                {option.label}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col lg={2} md={2} sm={2}>
                          <Button
                            className='bgcolor'
                            onClick={() => handleRemoveRow(index)}
                          >
                            <TiMinus color='#6c8098' size={25} />
                          </Button>
                        </Col>
                      </Row>
                    ))}

                  </div>

                    <Row className='align-items-center my-3'>
                    <Col lg={1} md={1} sm={1} className='text-end pe-0'>
                          <div>
                            <GiPlainCircle color='gray' />
                          </div>
                        </Col>
                      <Col lg={9} md={9} sm={9}>
                        <Form.Select
                          aria-label="Default select example"
                          value={selectedSchema ? selectedSchema.value : ''} // Set the value attribute to control the select input
                          onChange={handleSchemaChange}
                        >
                          {schemaOptions.map((option, optionIndex) => (
                            <option key={optionIndex} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col lg={2} md={2} sm={2}>
                        <Button
                          className='bgcolor '
                        >
                          <TiMinus color='#6c8098' size={25} />
                        </Button>
                      </Col>
                    </Row>

                  <div>
                    <Button variant="link" onClick={handleAddRow}>
                      + Add new schema
                    </Button>
                  </div>
                </div>

                <div className='bottomset'>
                  <div>
                    <Button variant="primary" onClick={handleSaveSegment}>
                      Add new schema
                    </Button>
                  </div>
                  <div>
                    <Button variant="light">Cancel</Button>
                  </div>
                </div>
              </Form>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

export default UIdesgin
