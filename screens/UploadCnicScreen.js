import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { BackGround } from "../components/Images";
import HeaderBack from "../components/Header/HeaderBack";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import { connect } from "react-redux";
import { defaultStyles, width, height } from "../constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { updateCnicImages } from "../store/actions/authActions";
import { _C } from "../constants/Colors";
import { BACKEND_URL } from "react-native-dotenv";
const widthF = width - 30;
export class UploadCnicScreen extends Component {
  render() {
    const { type } = this.props.route.params;
    const { frontImage, backImage, opacity, images } = this.state;
    const defaultProgressProps = {
      backgroundColorOnComplete: _C.yellow,
      backgroundColor: _C.text,
      borderWidth: 2,
      borderColor: _C.yellow,
      borderRadius: 8,
      barEasing: "quad",
      width: widthF - 10,
    };
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <HeaderBack isRight={false} title="Upload Cnic" {...this.props} />
          <View style={styles.boxP}>
            <View style={styles.item}>
              <View style={styles.imageP}>
                {frontImage ? (
                  <React.Fragment>
                    <Image
                      style={styles.image}
                      source={{
                        uri: frontImage.uri,
                      }}
                      resizeMode="cover"
                    />
                    {images.front ? (
                      <View style={styles.progressP}>
                        <ProgressBarAnimated
                          value={images.front.uploadProg}
                          {...defaultProgressProps}
                          onComplete={() => this.makeSureUploading()}
                        />
                        <Text style={styles.noImageT}>
                          Uploaded {images.front.uploadProg + "%"}
                        </Text>
                      </View>
                    ) : null}
                  </React.Fragment>
                ) : (
                  <Text style={styles.noImageT}>No Image Chosen </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleImagePick("front", type)}
              >
                <Text style={styles.buttonText}>Choose Front Image</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <View style={styles.imageP}>
                {backImage ? (
                  <React.Fragment>
                    <Image
                      style={styles.image}
                      source={{
                        uri: backImage.uri,
                      }}
                      resizeMode="cover"
                    />
                    {images.back ? (
                      <View style={styles.progressP}>
                        <ProgressBarAnimated
                          value={images.back.uploadProg}
                          {...defaultProgressProps}
                          onComplete={() => this.makeSureUploading()}
                        />
                        <Text style={styles.noImageT}>
                          Uploaded {images.back.uploadProg + "%"}
                        </Text>
                      </View>
                    ) : null}
                  </React.Fragment>
                ) : (
                  <Text style={styles.noImageT}>No Image Chosen </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleImagePick("back", type)}
              >
                <Text style={styles.buttonText}>Choose Back Image</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: widthF, opacity: opacity }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#fff" }]}
                onPress={() => this.makeSureUploading()}
              >
                <Text style={[styles.buttonText]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      images: { front: null, back: null },
      images_uploaded: { front: null, back: null },
      uploading: "front",
      uploaded: null,
      frontImage: null,
      backImage: null,
      opacity: 0.5,
    };
  }
  componentDidMount() {
    var type = this.props.route.params.type;
  }
  makeSureUploading = () => {
    const { images, images_uploaded } = this.state;
    if (images.front && images.back) {
      if (images.front.uploadProg == 100 && images.back.uploadProg == 100) {
        this.setState({ opacity: 1 });
        setTimeout(() => {
          this.props.updateCnicImages(images_uploaded);
        }, 3000);
      } else {
        this.setState({ opacity: 0.5 });
      }
    } else {
      return false;
    }
  };
  handleImagePick = (sec, type) => {
    this.setState({ uploading: sec });
    if (type == "take") {
      this.gallery_upload();
    } else {
      this.camera_upload();
    }
  };
  checkPem = (perm) => {
    return new Promise((resolve, reject) => {
      try {
        Permissions.getAsync(perm).then((res) => {
          if (res.status != "granted") {
            Permissions.askAsync(perm).then((res1) => {
              if (res.status != "granted") {
                resolve(true);
              } else {
                reject(false);
              }
            });
          } else {
            resolve(true);
          }
        });
      } catch (error) {
        reject(false);
      }
    });
  };
  gallery_upload = () => {
    this.checkPem(Permissions.CAMERA_ROLL).then((m) => {
      ImagePicker.launchImageLibraryAsync({
        multiple: true,
        mediaType: "photo",
        width: 300,
        height: 200,
        crop: true,
        warning: false,
      })
        .then((image) => {
          console.log("Uploaded From Gallery", image);
          if (!image.cancelled) this.handleImage(image);
        })
        .catch((error) => {});
    });
  };
  camera_upload = () => {
    this.checkPem(Permissions.CAMERA).then((m) => {
      ImagePicker.launchCameraAsync({
        multiple: true,
        mediaType: "photo",
        width: 300,
        height: 200,
        crop: true,
        warning: false,
      })
        .then((image) => {
          console.log("Uploaded From Camera", image);
          if (!image.cancelled) this.handleImage(image);
        })
        .catch((error) => {
          caches.log(error);
        });
    });
  };
  handleImage = (image) => {
    let key = Math.random();
    this.upload_image({
      name: "cnic-" + key + "-cnic.jpg",
      type: "image/jpg",
      uri: image.uri,
      isUploaded: false,
      uploadProg: 0,
      key: this.state.uploading,
    });
  };

  removeImage = (key, keyU) => {
    const images_uploaded = this.state.images_uploaded.filter(
      (obj) => obj.key != keyU
    );
    this.setState(
      { images_uploaded: images_uploaded },
      function afterTitleChange() {
        this.enableSubmit();
      }
    );
    const images = this.state.images.filter((movie, key1) => key1 !== key);
    this.setState({ images: images });
  };
  disableSubmit = () => {
    this.setState({ submitSate: true });
  };
  enableSubmit = () => {
    this.setState({ submitSate: false });
  };
  upload_image = (image) => {
    var sec = this.state.uploading;
    const images = this.state.images;
    var fImages = Object.assign(images, { [sec]: image });
    this.setState({ [sec + "Image"]: image });
    this.setState({ images: fImages });
    // 1. initialize request
    const xhr = new XMLHttpRequest();
    // 2. open request
    xhr.open("POST", BACKEND_URL + "upload-image");
    // 3. set up callback for request
    xhr.onload = () => {
      const response = JSON.parse(xhr.response);
      var secR = response.data.key;
      var images_uploaded = this.state.images_uploaded;
      let finalImages = Object.assign(images_uploaded, {
        [secR]: response.data.image,
      });
      this.setState({ [images_uploaded[secR]]: finalImages });
      // this.setImagesString();
    };
    // 4. catch for request error
    xhr.onerror = (e) => {
      alert(e.currentTarget._response);
      console.warn(e, "upload failed");
    };
    // 4. catch for request timeout
    xhr.ontimeout = (e) => {
      console.warn(e, "cloudinery timeout");
    };
    // 4. create formData to upload
    const formData = new FormData();
    formData.append("prefix", "cnic");
    // Keep It On Second No Always
    formData.append("images", {
      uri: image.uri, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
      type: image.type, // example: image/jpg
      name: image.name, // example: upload.jpg
      key: sec,
      uploadProg: image.uploadProg,
      isUploaded: image.isUploaded,
    });
    // Keep It On Second No Always
    formData.append("key", sec);
    // 6. upload the request
    xhr.send(formData);
    // 7. track upload progress
    if (xhr.upload) {
      // track the upload progress
      xhr.upload.onprogress = ({ total, loaded }) => {
        const uploadProgress = Math.round((loaded / total) * 100);
        this.updateImageUpload(formData._parts[1], uploadProgress, sec);
      };
    } else {
      alert("imag not up");
    }
  };
  updateImageUpload = (imageKey, progress, sec) => {
    const images = this.state.images;
    let newState = Object.assign(images, { [sec]: imageKey });
    newState[sec].uploadProg = progress;
    this.setState({ [images[sec]]: newState });
  };
}

const mapStateToProps = (state) => state.auth;

const mapDispatchToProps = { updateCnicImages };

export default connect(mapStateToProps, mapDispatchToProps)(UploadCnicScreen);
const styles = StyleSheet.create({
  ...defaultStyles,
  boxP: {
    display: "flex",
    flex: 1,
    width: widthF,
    alignItems: "center",
    justifyContent: "center",
    height: height - 100,
    left: 15,
  },
  item: {
    height: (height - 100) / 2.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageP: {
    display: "flex",
    height: "73%",
    width: widthF,
    backgroundColor: _C.bBG,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  noImageT: {
    fontSize: 22,
    color: _C.text,
    paddingTop: 5,
  },
  image: {
    flex: 1,
    height: "100%",
    backgroundColor: "red",
    width: "100%",
    borderRadius: 8,
  },
  progressP: {
    width: widthF,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
