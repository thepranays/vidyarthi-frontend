import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function NotificationToast(props: { show: boolean, setShow: Function, data: String }) {


    return (

        <Row>
            <Col xs={6}>
                <Toast onClose={() => props.setShow(false)} show={props.show} delay={3000} autohide>
                    <Toast.Header>
                        <img
                            src="../favicon.ico"
                            className="rounded me-2"
                            alt="404"
                        />
                        <strong className="me-auto">Hey There Vidyarthi !  </strong>
                        <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>{props.data}</Toast.Body>
                </Toast>
            </Col>
            {/* <Col xs={6}>
                <Button onClick={() => setShow(true)}>Show Toast</Button>
            </Col> */}
        </Row>

    );
}

export default NotificationToast;