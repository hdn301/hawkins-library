/**
 * Modal used in pages/events. Allows user to enter their email to
 * register for the selected event. Implements CREATE functionality
 * on 'eventRegistrations' table.
 *
 * See pages/api/registrations/add-registration for query.
 */

import styled from 'styled-components'
import Modal from 'react-modal'
import { useState, useEffect, useContext } from 'react'

import Input from '../Input'
import Button from '../styles/Button'
import Divider from '../styles/Divider'
import ModalContext from '../../context/modal-context'
import { modalStyleEvent, StyledModalContent } from '../styles/modalStyle'
import Spinner from '../Spinner'

const StyledEventModalContainer = styled.div`
  display: flex;
  @media (max-width: ${props => props.theme.screenSizeMed}) {
    flex-direction: column-reverse;
  }
`

const StyledEventForm = styled.div`
  flex: 2;
  padding: 3.6rem;
  h2 {
    margin-bottom: 1.2rem;
  }
  h4 {
    margin: 0;
  }
  p {
    margin-top: 0;
    span {
      font-weight: 700;
    }
  }
  @media (max-width: ${props => props.theme.screenSizeMed}) {
  }
`

const StyledEventModalImage = styled.div`
  flex: 1;
  background-color: ${props => props.theme.red};
  overflow: hidden;
  padding-left: 1.6rem;
  @media (max-width: ${props => props.theme.screenSizeMed}) {
    max-height: 100px;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    box-shadow: -3px 10px 15px -3px rgba(0, 0, 0, 0.5);
  }
`

const EventModal = props => {
  const { isOpen, closeModal } = useContext(ModalContext)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Reset state on modal close.
  useEffect(() => {
    return () => {
      setStatus({})
    }
  }, [isOpen])

  /**
   * Implements CREATE functionality on 'eventRegistrations' table,
   * Makes request to server to execute database operation. Sets the
   * component state with the updated data.
   */
  const addRegistration = async e => {
    e.preventDefault()
    setIsLoading(true)
    const data = {
      email,
      eventId: props.eventId
    }
    try {
      const response = await fetch('/api/registrations/add-registration', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // Convert returned promise to json and set state.
      const res = await response.json()
      setStatus(res)
      setIsLoading(false)
      // Reset input state and fields, close modal.
      setEmail('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyleEvent}
      ariaHideApp={false}
      closeTimeoutMS={100}
    >
      <StyledModalContent>
        <StyledEventModalContainer>
          <StyledEventForm>
            <h2>Register</h2>
            <h4>{props.title}</h4>
            <p>
              <span>Event Date:</span> {props.date}
              <br />
              <span>Guest:</span> {props.guest}
              <br />
            </p>
            {isLoading ? (
              <Spinner />
            ) : (
              status && (
                <span className={status.statusNo ? 'status--error' : 'status--ok'}>
                  {status.message}
                </span>
              )
            )}
            <Divider />
            <form onSubmit={addRegistration}>
              <Input
                type="email"
                placeholder="User Email *"
                value={email}
                name="email"
                id="email"
                onChange={e => {
                  setEmail(e.target.value)
                }}
                required
              />
              <Button>Register</Button>
              <a onClick={closeModal}>CANCEL</a>
            </form>
          </StyledEventForm>
          <StyledEventModalImage>
            <img src={props.imgUrl} />
          </StyledEventModalImage>
        </StyledEventModalContainer>
      </StyledModalContent>
    </Modal>
  )
}

export default EventModal
