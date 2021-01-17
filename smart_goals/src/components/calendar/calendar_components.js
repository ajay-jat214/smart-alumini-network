import React from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {  INITIAL_EVENTS,createEventId } from './event-utils';
import {Card} from '@material-ui/core';
import './calendar_components.css';
import {connect} from 'react-redux';
let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ''); 

var cardstyle={
  margin:'40px',
  height:'620px',
  width:'400px'
}

const mapStateToProps=(state)=>{
  const email=state.emailDetails.emailCredentials;
  const x={email};
  return x;
}

 class Calendar_Components extends React.Component {
constructor(){
  super();
  this.state = {
    weekendsVisible: true,
    currentEvents: [],
    updateId:''
}
 
}
 


   createEventId=()=> {
  return String(eventGuid++)
}


  render() {
   let value=this.props.show||this.props.EVENTS_LOAD.length!==0;

    return (

      <div className='demo-app events flex flex-end'>
       
       <div className='demo-app-sidebar  card-box-shadow1 yoo' style={{marginTop:'40px',marginRight:'10px',width:'100%',backgroundColor:'white'}}>
          <div className='demo-app-sidebar-section'>
            <h2 className="">Todays Events </h2>
            <ul>
              {this.props.EVENTS_LOAD.map(this.renderSidebarEvent)}
            </ul>
          </div>
        </div>

    <div className="sccroll">
    <div className=' demo-app-main card-box-shadow1 calendar' style={{width:'800px',height:'656px',marginTop:'40px'}}>{
          value
          ?
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            calendar
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            eventResizableFromStart={true}
            dayMaxEvents={true}
            eventOverlap={false}
            weekends={this.state.weekendsVisible}
            initialEvents={this.props.EVENTS_LOAD} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={this.renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventStartEditable={this.update_function}
            eventsSet={this.handleEvents}
            eventResize={this.resize}
            eventDragStart={this.handle} // called after events are initialized/added/changed/removed
            />
            :
            null
    }</div>
   </div>

   </div>


    )
  }


  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }



  handle=(events)=>{
    this.setState({updateId:events.event.id})
  }
  handleDateSelect = (selectInfo) => {
    let id;
    let title = prompt('Please enter a new title for your event')
    let color = prompt('Please enter a new color for your event')
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor:color,
      })

    fetch('http://localhost:3001/fetchCalendar',{
      method:'post',
      headers: { Authentication: 'Content-Type:application/json' },
      body:JSON.stringify({

              email:this.props.email,
              startDate:selectInfo.start,
              endDate:selectInfo.end,
              title:title,
              backgroundColor:color,
              })
    })
    .then(response=>response.json())
    .then(user=>{
      alert(user)
      this.props.call_back();
    })
 

  } 
    return;

  }

  handleEventClick = (clickInfo) => {
  
   if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}' if yes enter anything else leave blank`)) {
            clickInfo.event.remove();
           
            fetch('http://localhost:3001/delete',{
                method: "post",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({
                  email:this.props.email,
                  id: clickInfo.event.id,
                }),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                this.props.call_back();
                alert(data)

              })
              .catch((err) => console.log(err));
              
          }      
    
  }
  

  resize = (event) => {

      let start1 = event.event.start;
      let end1 = event.event.end;
      let title1 = event.event.title;
      let color = event.event.backgroundColor;
      return fetch('http://localhost:3001/update',{
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: event.event.id,
            email: this.props.email,
            startDate: start1,
            endDate: end1,
            title: title1,
            backgroundColor: color
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          alert(data);
        })
        .catch((err) => console.log(err));
      this.props.call_back();
  };


  handle = (events) => {
    this.setState({ updateId: events.event.id });
  };


  handleEvents = (events) => {
    for (let i = 0; i < events.length; i++) {
      if (this.state.updateId === events[i].id) {
          let start1 = events[i].startStr;
          let end1 = events[i].endStr;
          let title1 = events[i].title;
          let color = events[i].backgroundColor;
          fetch('http://localhost:3001/update',{
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: this.props.email,
                sessionId: this.state.updateId,
                startDate: start1,
                endDate: end1,
                title: title1,
                backgroundColor: color
              }),
            }
          )
          .then((response) => response.json())
          .then((data) => {
             alert(data);
          })
          .catch((err) => console.log(err));
      }
      this.props.call_back();

   }
  }
 
 renderEventContent=(eventInfo)=>{

  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

 renderSidebarEvent=(event)=> {
  
  var option = {};
  const options = new Date(event.start).toLocaleTimeString([], option);

  return (

    <div key={event.id}>
    <div>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
    </div>
              <i>{"                                     " + event.title}</i>
              <i>{"    " + options}</i>
    </div>

  )
}

}

export default connect(mapStateToProps,null)(Calendar_Components);

  // <div className="eventSection">{
  //     parseInt(formatDate(event.start.substring(0,10), { day: "numeric" })) ===
  //     parseInt(formatDate(todayStr,{day:'numeric'}))
  //     ?  
  //   :
  //   null
  // }</div>