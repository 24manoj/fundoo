import React, { Component } from "react";
import {
  TextField,
  Card,
  MuiThemeProvider,
  InputBase,
  IconButton,
  Icon,
  ClickAwayListener,
  Button,
  Popper,
  Paper,
  Snackbar,
  Chip,
  Checkbox
} from "@material-ui/core";
import "../../App.css";
import {
  Alarm,
  BrushOutlined,
  CheckBoxOutlined,
  UndoOutlined,
  ImageOutlined,
  PinDropOutlined,
  PersonPin,
  LabelImportantOutlined,
  ImportantDevicesOutlined,
  NotificationImportant,
  NotificationImportantOutlined,
  PersonAddOutlined,
  ColorizeOutlined,
  ColorLensOutlined,
  ArchiveOutlined,
  CloseOutlined,
  MoreVertOutlined,
  PlusOneOutlined,
  AddCircleOutline
} from "@material-ui/icons";
import pin from "../../assets/afterPin.svg";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

class Notes extends Component {
  constructor() {
    super();

    this.state = {
      newLabel: '',
      NoteState: false,
      NoteTake: false,
      NoteTitile: "",
      NoteContent: "",
      NoteColor: "",
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
      reminderPoper: false,
      labelListPoper: false,
      filterState: false,
      colorPalette: [
        {
          name: "default",
          colorCode: "#FDFEFE"
        },
        {
          name: "Red",
          colorCode: "#ef9a9a"
        },
        {
          name: "Cyan",
          colorCode: "#80deea"
        },
        {
          name: "Blue",
          colorCode: "#2196f3"
        },
        {
          name: "Indigo",
          colorCode: "#9fa8da"
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
          colorCode: "#fff59d"
        },
        {
          name: "Lime",
          colorCode: "#e6ee9c"
        },
        {
          name: "Pink",
          colorCode: " #f48fb1"
        },
        {
          name: "gray",
          colorCode: "#eeeeee"
        },
        {
          name: "Brown",
          colorCode: "#bcaaa4"
        }
      ]
    };
  }



  CreateNote = async () => {
    if ((this.state.NoteContent !== "") | (this.state.NoteTitile !== "")) {
      let payload = {
        title: this.state.NoteTitile,
        content: this.state.NoteContent,
        color: this.state.NoteColor,
        Archive: this.state.Archive,
        reminder: this.state.reminder,
        label: this.state.noteLabel
      };
      await this.props.createNote(payload);

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

    this.setState({
      NoteTake: false,
      NoteTitile: "",
      NoteContent: "",
      NoteColor: "",
      Archive: false,
      anchorEl: null,
      reminder: undefined
    });
  };
  NoteArchived = async () => {
    if ((this.state.NoteContent !== "") | (this.state.NoteTitile !== "")) {
      console.log("in");

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
  };

  AddReminder = (event) => {
    this.setState({
      reminderPoper: !this.state.reminderPoper,
      anchorEl: event.currentTarget
    });
  };

  dateSet = async newDate => {
    await this.setState({
      reminder: newDate.toString().slice(0, 15),
      NoteState: true
    });
  };

  addNoteLabel = async (event) => {
    try {
      console.log(event.target.id, event.target.value);
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
      if (remove == false) {

        this.setState({ noteLabel: [...this.state.noteLabel, data] })
      }
    } catch (err) {
      console.log(err);

    }
  }
  removeLabel = (id, event) => {
    try {
      if (this.state.newLabel._id === id) {
        this.setState({ newLabel: '' })
      }
      let array = this.state.noteLabel;
      this.state.noteLabel.forEach((element, index) => {
        if (element.id === id) {
          array.splice(index, 1)
          this.setState({ noteLabel: array })
        }

      })
    } catch (err) {
      console.log(err);

    }

  }

  filterLabel = async (event) => {
    await this.setState({ labelValue: event.target.value, searchLabels: [] })
    let filterLabel = []
    let special = /[!@#$%^&*(),.?":{}|<>]/
    console.log("this", (this.state.labelValue === ''));

    if (this.state.labelValue.length <= 0) {
      this.setState({ found: true, filterState: false })
      console.log("thsis found", this.state.found);

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
  }
  createLabel = async (event) => {
    await this.props.createLabel(this.state.labelValue)
    this.setState({ labelValue: '', filterState: false, found: true })


  }


  componentWillMount() {
    this.setState({ newLabel: this.props.newLabel })
  }
  render() {

    return (
      <div>
        <div className="NoteCreate">
          {!this.state.NoteTake ? (
            <Card className="TakeNote" hidden={this.state.NoteTake}>
              <div>
                <InputBase
                  onClick={event =>
                    this.setState({
                      NoteTake: true
                    })
                  }
                  title="Title"
                  type="text"
                  placeholder="Take a note..."
                />
              </div>
              <div>
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
                    this.state.OptionsPoper
                    ? ""
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
                      <img src={pin} className="Iconpin" />
                    </div>
                  </div>
                  <div>
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
                    {this.state.newLabel !== undefined && this.state.newLabel != '' ?
                      <Chip key={this.state.newLabel._id} label={this.state.newLabel.labelName} onDelete={(event) => this.removeLabel(this.state.newLabel._id, event)} />
                      :
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
                          this.state.reminder != undefined
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
                  <div className="TakeNoteIcon">
                    <div className="TakeNoteIcon-Icons">
                      <NotificationImportantOutlined
                        titleAccess="Remind me"
                        onClick={this.AddReminder}
                      />
                      <PersonAddOutlined titleAccess="Collaborate" />
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
                    placement={"top-start"}
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
                      <Paper>
                        {this.state.colorPalette.map((code, index) => (
                          <IconButton
                            key={index}
                            style={{
                              backgroundColor: code.colorCode,
                              margin: "2px"
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
                          />
                        ))}
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                </Card>
              </ClickAwayListener>
            )}
        </div>

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
                <IconButton style={{ borderRadius: '0px', width: '100%' }} > <AddCircleOutline /> Add Label </IconButton> </label>
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
                      <p></p>{label.labelName} </div>) : <label> No Label Found!!</label>
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
                <IconButton onClick={this.createLabel} > <AddCircleOutline />Create Label</IconButton>
                <p>"{this.state.labelValue}"</p>

              </div>

            </Card>
          </ClickAwayListener>
        </Popper>
      </div>

    );
  }
}
export default Notes;
