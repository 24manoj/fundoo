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
  Chip
} from "@material-ui/core";
import "../../App.css";
import {
  Alarm,
  BrushOutlined,
  ImageAspectRatioOutlined,
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
  CloseOutlined
} from "@material-ui/icons";
import pin from "../../assets/afterPin.svg";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
class Notes extends Component {
  constructor() {
    super();
    this.state = {
      NoteState: false,
      NoteTake: false,
      NoteTitile: "",
      NoteContent: "",
      NoteColor: "",
      anchorEl: null,
      reminderPoper: false,
      ColorProper: false,
      Archive: false,
      reminder: undefined,
      reminderPoper: false,
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
        reminder: this.state.reminder
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
  AddReminder = event => {
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
  render() {
    return (
      <div>
        <div className="NoteCreate">
          {!this.state.NoteTake ? (
            <Card className="TakeNote" hidden={this.state.NoteTake}>
              <div>
                {" "}
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
              </div>{" "}
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
                </div>{" "}
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
                      onDelete={event => this.state.reminder}
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
                )}{" "}
                <div className="TakeNoteIcon">
                  <div className="TakeNoteIcon-Icons">
                    <NotificationImportantOutlined
                      titleAccess="Remind me"
                      onClick={this.AddReminder}
                    />{" "}
                    <PersonAddOutlined titleAccess="Collaborate" />
                    <ColorLensOutlined
                      titleAccess="change Color"
                      onClick={event =>
                        this.setState({
                          anchorEl: event.currentTarget,
                          ColorProper: true
                        })
                      }
                    />{" "}
                    <ImageOutlined titleAccess=" Add Image" />
                    <ArchiveOutlined
                      titleAccess=" Archive Note"
                      onClick={this.NoteArchived}
                    />{" "}
                  </div>{" "}
                  <Button variant="text" onClick={this.CreateNote}>
                    {" "}
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
                            anchorEl: ""
                          })
                        : ""
                    }
                  >
                    <Paper>
                      {" "}
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
                      ))}{" "}
                    </Paper>
                  </ClickAwayListener>
                </Popper>
              </Card>{" "}
            </ClickAwayListener>
          )}
        </div>

        <Popper open={this.state.reminderPoper} anchorEl={this.state.anchorEl}>
          <Paper>
            <ClickAwayListener
              onClickAway={event =>
                this.setState({
                  reminderPoper: false,
                  anchorEl: "",
                  NoteState: false
                })
              }
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  onClose={() =>
                    this.setState({
                      reminderPoper: false,
                      anchorEl: ""
                    })
                  }
                  onChange={this.dateSet}
                  errortext="Required"
                />
              </MuiPickersUtilsProvider>{" "}
            </ClickAwayListener>{" "}
          </Paper>
        </Popper>
      </div>
    );
  }
}
export default Notes;
