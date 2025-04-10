/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : Build a TakeNote componenet
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/
import React, { Component } from "react";
import { messageService } from '../../minddleware/middleWareServices'
import { Collaborator } from "./Collaborator";

import {
  TextField,
  Card,
  MuiThemeProvider,
  InputBase,
  IconButton,

  ClickAwayListener,
  Button,
  Popper,
  Paper,

  Chip,
  Checkbox,
  createMuiTheme,
  Avatar
} from "@material-ui/core";
import "../../App.scss";
import {
  Alarm,
  BrushOutlined,
  CheckBoxOutlined,
  ImageOutlined,
  NotificationImportantOutlined,
  ColorLensOutlined,
  ArchiveOutlined,
  MoreVertOutlined,
  AddCircleOutline,
  Done
} from "@material-ui/icons";
import pin from "../../assets/afterPin.svg";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        fontFamily: "Georgia,Times New Roman, Times, serif",
        fontWeight: 600
      }
    }
  }
})
class Notes extends Component {
  constructor() {
    super();
    this.state = {
      newLabel: '',
      NoteState: false,
      NoteTake: false,
      NoteTitile: "",
      NoteContent: "",
      NoteColor: "#FDFEFE",
      searchLabels: [],
      labelValue: '',
      noteLabel: [],
      anchorEl: null,
      OptionsPoper: false,
      reminderPoper: false,
      ColorProper: false,
      Archive: false,
      found: true,
      reminder: undefined,
      labelListPoper: false,
      filterState: false,
      sideNav: false,
      CollaboratorDailog: false,
      CollaborateArray: [],
      colorPalette: [
        {
          name: "default",
          colorCode: "#FDFEFE"
        },
        {
          name: "Red",
          colorCode: "#f28b82"
        },
        {
          name: "Cyan",
          colorCode: "#80deea"
        },
        {
          name: "orange",
          colorCode: "#fbbc04"
        },
        {
          name: "Tea",
          colorCode: "#a7ffeb"
        },
        {
          name: "LightBlue",
          colorCode: "#90caf9"
        },
        {
          name: "Purple",
          colorCode: "#b39ddb"
        },
        {
          name: "Yellow",
          colorCode: "#fff475"
        },
        {
          name: "litegreen",
          colorCode: "#1AE55B"
        },
        {
          name: "Pink",
          colorCode: " #f48fb1"
        },
        {
          name: "gray",
          colorCode: "#e8eaed"
        },
        {
          name: "Brown",
          colorCode: "#bcaaa4"
        }
      ]
    };
    messageService.getMessage().subscribe(message => {
      try {
        if (message.text.key === 'sideNav') {


          this.setState({
            sideNav: message.text.value
          })

        }
      } catch (err) {
        console.log(err);

      }
    })
  }

  /**
   * @description creates a new note
   */
  CreateNote = async () => {
    try {
      if ((this.state.NoteContent !== "") | (this.state.NoteTitile !== "")) {
        let payload = {
          title: this.state.NoteTitile,
          content: this.state.NoteContent,
          color: this.state.NoteColor,
          Archive: this.state.Archive,
          reminder: this.state.reminder,
          label: this.state.noteLabel,
          collaborate: this.state.CollaborateArray
        };
        await this.props.createNote(payload);
        this.setState({
          NoteTake: false,
          NoteTitile: "",
          NoteContent: "",
          NoteColor: "",
          Archive: false,
          anchorEl: null,
          reminder: undefined,
          CollaborateArray: []
        });
      }

      this.setState({
        NoteTake: false,
        NoteTitile: "",
        NoteContent: "",
        NoteColor: "",
        Archive: false,
        anchorEl: null,
        reminder: undefined
      });
    } catch (err) {
      console.log(err);

    }
  };
  /**
   * @description archives a specific note
   */
  NoteArchived = async () => {
    try {
      if ((this.state.NoteContent !== "") | (this.state.NoteTitile !== "")) {
        await this.setState({
          Archive: true
        });
        this.CreateNote();
      } else {
        this.setState({
          NoteTake: false,
          NoteTitile: "",
          NoteContent: "",
          NoteColor: "",
          Archive: false,
          anchorEl: null,
          reminder: undefined
        });
      }
    } catch (err) {
      console.log(err);

    }
  }
  /**
   * @description adds reminder to notes
   */
  AddReminder = (event) => {
    this.setState({
      reminderPoper: !this.state.reminderPoper,
      anchorEl: event.currentTarget
    });
  };
  /**
   * @description sets new date to reminder state
   */
  dateSet = async newDate => {
    await this.setState({
      reminder: newDate.toString().slice(0, 15),
      NoteState: true
    });
  };

  /**
  * @description adds labels to note
  */
  addNoteLabel = async (event) => {
    try {
      let array = this.state.noteLabel;
      let remove = false;
      let data = {
        id: event.target.id,
        value: event.target.value
      }
      this.state.noteLabel.forEach((element, index) => {
        if (element.id === data.id) {
          remove = true;
          array.splice(index, 1)
          this.setState({ noteLabel: array })
        }
      })
      if (remove === false) {

        this.setState({ noteLabel: [...this.state.noteLabel, data] })
      }
    } catch (err) {
      console.log(err);
    }
  }
  /**
  * @description removes label from note
  */
  removeLabel = (id, event) => {
    try {
      if (this.props.newLabel._id === id) {
        console.log("in");
        this.removeNewLabel()
      } else {
        let array = this.state.noteLabel;
        this.state.noteLabel.forEach((element, index) => {
          if (element.id === id) {
            array.splice(index, 1)
            this.setState({ noteLabel: array })
          }

        })
      }
    } catch (err) {
      console.log(err);

    }

  }

  filterLabel = async (event) => {
    try {
      await this.setState({ labelValue: event.target.value, searchLabels: [] })
      let filterLabel = []
      let special = /[!@#$%^&*(),.?":{}|<>]/

      if (this.state.labelValue.length <= 0) {
        this.setState({ found: true, filterState: false })

      } else {
        if (!special.test(this.state.labelValue)) {
          let patt = new RegExp(`${this.state.labelValue}`)
          this.props.labels.forEach((element) => {

            if (patt.test(element.labelName)) {
              console.log("search", element.labelName);
              filterLabel.push(element)
            }
          })
          // console.log(filterLabel.length, this.state.labelValue.length, filterLabel[0].labelName);
          if (filterLabel.length === 0) {
            this.setState({ found: false })

          } else {
            if (filterLabel.length === 1 && filterLabel[0].labelName.length === this.state.labelValue.length) {
              this.setState({ found: true }
              )
            } else {
              this.setState({ found: false })
            }
            this.setState({ filterState: true, searchLabels: filterLabel })
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  /**
  * @description crates a new label
  */
  CollaboratorDailog = (state) => {
    this.setState({ CollaboratorDailog: state })
  }
  /**
  * @description crates a new label
  */
  createLabel = async (event) => {
    await this.props.createLabel(this.state.labelValue)
    this.setState({ labelValue: '', filterState: false, found: true, labelListPoper: false })
  }
  /**
  * @description removes label from  labels array
  */
  removeNewLabel = () => {
    this.props.handelDeleteNewLabel()
  }

  CollaboratorAdd = async (collEmail) => {
    try {
      let array = this.state.CollaborateArray.concat(collEmail)
      await this.setState({ CollaborateArray: array })

    } catch (err) {
      console.log(err);

    }
  }
  handelDeleteColl = (event) => {
    try {
      let array = this.state.CollaborateArray
      let index = array.map(ele => ele._id).indexOf(event.target.id)
      let array2 = this.state.CollaborateArray
      array2.splice(index, 1)
      this.setState({
        CollaborateArray: array2
      })

    } catch (err) {
      console.log(err);

    }
  }
  CollaborateState = async (state) => {
    await this.setState({ CollaboratorDailog: state })
  }
  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <div id={this.state.sideNav ? 'transitionLeft' : ''} className={this.props.ArchiveState !== undefined ? 'hideDiv' : (this.props.TrashState !== undefined ? 'hideDiv' : "NoteCreate")}>
          {!this.state.NoteTake ? (
            <Card className="TakeNote" >
              <InputBase
                style={{ width: '80%' }}
                onClick={event =>
                  this.setState({
                    NoteTake: true
                  })
                }
                title="Title"
                placeholder="Take a note..."
              />
              <div className="createNoteIcons">
                <CheckBoxOutlined titleAccess="New List" />
                <BrushOutlined titleAccess=" new Note with Drawing" />
                <ImageOutlined titleAccess="new Note with image" />
              </div>
            </Card>
          ) : (
              <ClickAwayListener
                onClickAway={event =>
                  this.state.ColorProper |
                    this.state.reminderPoper |
                    this.state.NoteState
                    | this.state.labelListPoper |
                    this.state.OptionsPoper |
                    this.state.CollaboratorDailog
                    ? this.setState({ CollaboratorDailog: false })
                    : this.setState({
                      NoteTake: false
                    })
                }
              >
                <Card
                  className="TakeDetails"
                  hidden={!this.state.NoteTake}
                  style={{
                    backgroundColor: this.state.NoteColor
                  }}
                >
                  <div className="titleIcon">
                    <div>
                      <InputBase
                        title="Title"
                        type="text"
                        placeholder="Title"
                        value={this.state.NoteTitile}
                        onChange={event =>
                          this.setState({
                            NoteTitile: event.target.value
                          })
                        }
                        fullWidth
                      />
                    </div>
                    <div>
                      <img src={pin} className="Iconpin" alt="pin" />
                    </div>
                  </div>
                  <div >
                    <InputBase
                      title="Description"
                      type="text"
                      placeholder="Take a note..."
                      value={this.state.NoteContent}
                      onChange={event =>
                        this.setState({
                          NoteContent: event.target.value
                        })
                      }
                      fullWidth
                    />
                  </div>
                  <div>
                    {this.props.newLabel !== undefined && this.props.newLabel !== '' ?
                      <Chip key={this.props.newLabel._id} label={this.props.newLabel.labelName} onDelete={(event) => this.removeLabel(this.props.newLabel._id, event)} />
                      : ''}{
                      this.state.noteLabel.length > 0 ? this.state.noteLabel.map((element) =>
                        <Chip key={element.id} label={element.value} onDelete={(event) => this.removeLabel(element.id, event)} />
                      ) : ''}

                  </div>
                  {this.state.reminder !== undefined ? (
                    <div>
                      <Chip
                        style={{
                          width: "auto"
                        }}
                        icon={<Alarm />}
                        label={
                          this.state.reminder !== undefined
                            ? this.state.reminder
                            : ""
                        }
                        onDelete={event =>
                          this.setState({
                            NoteState: false,
                            reminder: undefined
                          })
                        }
                      />
                    </div>

                  ) : (
                      ""
                    )}
                  {this.state.CollaborateArray !== undefined ?
                    <div>
                      {this.state.CollaborateArray.map(ele =>

                        <Chip
                          id={ele._id}
                          style={{
                            width: "auto"
                          }}
                          avatar={<Avatar alt="profile" src={ele.url} />}
                          label={
                            ele.email
                          }
                          onDelete={this.handelDeleteColl
                          }
                        />
                      )}
                    </div> : ''
                  }
                  <div className="TakeNoteIcon">
                    <div className="TakeNoteIcon-Icons">
                      <NotificationImportantOutlined
                        titleAccess="Remind me"
                        onClick={this.AddReminder}
                      />
                      <Collaborator CollaboratorDailog={this.CollaboratorDailog} CollaboratorAdd={this.CollaboratorAdd} CollaborateState={this.CollaborateState} />
                      <ColorLensOutlined
                        titleAccess="change Color"
                        onClick={event =>
                          this.setState({
                            anchorEl: event.currentTarget,
                            ColorProper: true
                          })
                        }
                      />
                      <ImageOutlined titleAccess=" Add Image" />
                      <ArchiveOutlined
                        titleAccess=" Archive Note"
                        onClick={this.NoteArchived}
                      />
                      <MoreVertOutlined titleAccess="More"
                        onClick={event => this.setState({ OptionsPoper: !this.state.OptionsPoper, anchorEl: event.currentTarget })}
                      />
                    </div>
                    <Button variant="text" onClick={this.CreateNote}>
                      <b> Close </b>
                    </Button>
                  </div>
                  <Popper
                    open={this.state.ColorProper}
                    anchorEl={this.state.anchorEl}
                    placement={"bottom-start"}
                    style={{
                      width: "100px"
                    }}
                  >
                    <ClickAwayListener
                      onClickAway={event =>
                        this.state.NoteTake
                          ? this.setState({
                            ColorProper: false,
                            anchorEl: null
                          })
                          : ""
                      }
                    >
                      <Paper style={{ width: '135px' }}>
                        {this.state.colorPalette.map((code, index) => (
                          <IconButton
                            key={index}
                            className='colorstyle'
                            style={{
                              backgroundColor: code.colorCode
                            }}
                            title={code.name}
                            onClick={event =>
                              this.setState({
                                NoteColor: event.target.value,
                                anchorEl: "",
                                ColorProper: false
                              })
                            }
                            value={code.colorCode}
                          >
                            {this.state.NoteColor === code.colorCode ? <Done style={{ width: '20px', position: 'absolute' }} /> : ''}

                          </IconButton>
                        ))}

                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                </Card>
              </ClickAwayListener>
            )}


          <Popper open={this.state.reminderPoper} anchorEl={this.state.anchorEl}>
            <Paper>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  onClose={() =>
                    this.setState({
                      reminderPoper: false,
                      anchorEl: null
                    })
                  }
                  onChange={this.dateSet}
                />
              </MuiPickersUtilsProvider>
            </Paper>
          </Popper>
          <Popper open={this.state.OptionsPoper} anchorEl={this.state.anchorEl} placement={'bottom'} >
            <ClickAwayListener onClickAway={event => this.setState({ OptionsPoper: !this.state.OptionsPoper })} >
              <Card className="Options">
                <label onClick={event => this.setState({ OptionsPoper: !this.state.OptionsPoper, labelListPoper: !this.state.labelListPoper })}>
                  <IconButton className='Options-div' > <AddCircleOutline /> Add Label </IconButton> </label>
              </Card>
            </ClickAwayListener>
          </Popper>
          <Popper open={this.state.labelListPoper} anchorEl={this.state.anchorEl} placement={'bottom'} >
            <ClickAwayListener onClickAway={event => this.setState({ labelListPoper: !this.state.labelListPoper, anchorEl: null, filterState: false })} >
              <Card className="Options-labels">
                <label>Label List</label>
                <TextField
                  type="text"
                  placeholder='Enter Label'
                  value={this.state.labelValue}
                  onChange={this.filterLabel}

                />
                <div className="listLabels">
                  {this.state.filterState ?
                    this.state.searchLabels.length > 0 ? this.state.searchLabels.map((label) =>
                      <div key={label._id} className="labelsCheckBox">
                        <Checkbox color="primary" value={label.labelName} id={label._id} onChange={this.addNoteLabel} />
                        <p></p>{label.labelName} </div>) : <label className="label-err"> No Label Found!!</label>
                    :
                    this.props.labels.map((label) =>
                      <div key={label._id} className="labelsCheckBox">
                        <Checkbox color="primary" value={label.labelName} id={label._id} onChange={this.addNoteLabel} />
                        <p></p>{label.labelName} </div>
                    )
                  }
                </div>
                <div hidden={this.state.found}>
                  <hr />
                  <IconButton onClick={this.createLabel} className="checkBox-addLabel"> <AddCircleOutline />Create Label</IconButton>
                </div>

              </Card>
            </ClickAwayListener>
          </Popper>

        </div>
      </MuiThemeProvider>
    );
  }
}
export default Notes;
