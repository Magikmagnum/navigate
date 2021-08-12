import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler'

const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;

export function HeaderAvatar(props) {
  return (
    <View style={styles.headAvatarContent}>
      <Image style={styles.headAvatar} source={props.avatarUri} />
    </View>
  )
}

export function HeaderAvatarProfil(props) {
  return (
    <View style={{ ...styles.headAvatarContent, height: 82, width: 82, }}>
      <Image style={{ ...styles.headAvatar, height: 82, width: 82, borderRadius: 12 }} source={props.avatarUri} />
    </View>
  )
}

export function HeaderAvatarComment(props) {
  return (
    <View style={{ ...styles.headAvatarContent, height: 36, width: 36, }}>
      <Image style={{ ...styles.headAvatar, height: 36, width: 36, borderRadius: 6 }} source={props.avatarUri} />
    </View>
  )
}

export function HeaderMore(props) {
  return (
    <BorderlessButton onPress={() => setModalVisible(true)} style={{ width: 64, justifyContent: "center", alignItems: "center" }}>
      <Ionicons name="md-more" size={28} />
    </BorderlessButton>
  )
}

export function Paragraphe(props) {

  let text = "Cards have no singular layout, typographic, or image size. All cards should be designed to meet the needs of the content they present. This section shows a variety of card layouts to help showcase that variety"
  if (props.text) {
    text = props.text
  }

  return (
    <View style={{ ...props.styleChild }}>
      <Text style={{ color: '#666', textAlign: 'justify', lineHeight: 21, fontSize: 14, ...props.style }}>{text}</Text>
    </View>
  )
}

export function ImageBody(props) {
  return (
    <View style={styles.body}>
      <Image style={styles.bodyImage} source={props.imageUri} />
    </View>
  )
}

export function ImageContent(props) {
  return (
    <View style={styles.body}>
      <Image style={{ ...styles.bodyImage, width: windowWidth, borderRadius: 0, marginLeft: 40 }} source={props.imageUri} />
    </View>
  )
}

export function HeaderTitle(props) {

  let styleTitle = {}
  if (!props.subTitle) {
    styleTitle = {
      justifyContent: 'center'
    }
  }

  let subColor = {}
  if (props.subColor) {
    subColor = { color: props.subColor }
  }

  return (
    <View style={{ ...styles.headerTextContent, ...styleTitle, marginBottom: 2 }}>
      <Text style={{ ...styles.headText, color: props.color }} numberOfLines={props.numberOfLines}>{props.title}</Text>

      {props.litleTitle && <Text
        style={{ ...styles.headSubText, marginTop: 4, lineHeight: 16, color: color.primary.color, fontWeight: "bold" }}
        numberOfLines={props.subNumberOfLines}
        dataDetectorType={props.subDataDetectorType}
      >{props.litleTitle}</Text>}

      {props.subTitle && <Text
        style={{ ...styles.headSubText, marginTop: 4, lineHeight: 16, ...subColor }}
        numberOfLines={props.subNumberOfLines}
        dataDetectorType={props.subDataDetectorType}
      >{props.subTitle}</Text>}
    </View>
  )
}


export function Category(props) {

  let height = 100
  if (props.title) {
    height = 150
  }
  //backgroundColor:'#eee'
  return (
    <>
      <View style={{ height: height, marginLeft: 20, borderWidth: 0.2 }}>
        <View style={{ height: 100, width: 100, borderColor: '#aaa', borderRadius: 12, elevation: 3, backgroundColor: color.primary.color }}>
          <Image source={props.imageUri} style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12, flex: 1, width: null, height: null, resizeMode: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
        </View>
        {
          props.title && <View style={{ flex: 1, paddingLeft: 2, paddingTop: 12 }}>
            <Text style={{ fontSize: 13, color: '#222' }}>{props.title}</Text>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.note}</Text>
              <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='staro' size={14} color='#888' />
              <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.voter}</Text>
              <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='book' size={14} color='#888' />
            </View>
          </View>
        }
      </View>
    </>
  )
}



export function DashItems(props) {
  let border = {}
  let color = '#000'
  let borderColor = '#eee'

  if (props.theme == 'dark') {
    color = '#fff'
    borderColor = '#444'
  }
  if (!props.end) {
    border = { borderRightWidth: 0.8, borderColor: borderColor }
  }

  return (
    <View style={{ ...border, width: 64, height: 44, flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Ionicons name={props.icon} color={color} size={22} />
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: color }}>{props.note + ' ' + props.title}</Text>
    </View>
  )
}


export function HeaderShown(props) {

  let marginLeft = 0
  let width = windowWidth
  let alignItems = 'center'
  let theme = {
    icon: {
      color: '#000'
    },
    text: {
      color: '#000'
    },
    content: {
      backgroundColor: '#fff'
    }
  }


  if (props.alignLeft) {
    alignItems = "flex-start"
  }

  if (!props.icon && props.iconRight) {
    marginLeft = 64
    width = windowWidth - 64
  } else if (props.icon || props.iconRight) {
    marginLeft = 8
    width = windowWidth - 128
  }

  if (props.theme == 'dark') {
    theme.icon.color = '#fff'
    theme.text.color = '#fff'
    theme.content.backgroundColor = '#000'
  }
  return (
    <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', height: 64, ...theme.content, ...props.style }}>
      {props.icon ?
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center', height: 64, width: 64 }}
          onPress={() => props.callback()}>
          <Ionicons name={props.icon} color={theme.icon.color} size={24} />
        </TouchableOpacity> : null
      }
      <View style={{ alignItems: alignItems, justifyContent: 'center', height: 64, width: width }} >
        <Text style={{ ...styles.headText, marginLeft: marginLeft, ...theme.text }}>{props.title}</Text>
      </View>
      {props.iconRight ?
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center', height: 64, width: 64 }}
          onPress={() => props.callbackRight()}>
          <Ionicons name={props.iconRight} color={theme.icon.color} size={20} />
        </TouchableOpacity> : null
      }
    </SafeAreaView>
  )
}


export function HeaderShownSearch(props) {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View style={{ flexDirection: "row", height: 46, backgroundColor: '#fff', margin: 20, borderRadius: 4, elevation: 3 }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: 46, height: 46 }}>
          <Ionicons name='md-menu' size={24} color='#666' />
        </View>
        <TextInput
          placeholder='Rechercher un contacts'
          placeholderTextColor='#aaa'
          style={{ flex: 1, height: 46, fontSize: 16, backgroundColor: '#fff', paddingHorizontal: 20 }}
          onChangeText={(text) => searchContact(text)}
        />
        <View style={{ justifyContent: "center", alignItems: "center", width: 46, height: 46 }}>
          <AntDesign name='search1' size={24} color='#666' />
        </View>
      </View>
    </SafeAreaView>
  )
}



export function Item(props) {

  let marginHorizontal = 0
  if (props.icon) {
    marginHorizontal = 20
  }

  let size = 36
  if (props.subTitle) {
    size = 64
  }

  return (
    <View style={{ flexDirection: "row", alignItems: 'center', height: size, marginHorizontal: 10, marginLeft: props.marginLeft }}>
      <View sltyl={{}} >
        <Ionicons name={props.icon} color='#666' size={18} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#666', marginHorizontal: marginHorizontal }}>{props.title}</Text>
        {props.subTitle ? <Text style={{ ...{ fontSize: 12, color: '#666' }, marginHorizontal: marginHorizontal }}>{props.subTitle}</Text> : null}
      </View>
    </View>
  )
}

export function Topbar(params) {
  return (
    <View style={{ height: 64, width: windowWidth, flexDirection: "row", alignItems: "center", position: "absolute", top: 0, elevation: 4, backgroundColor: '#fff' }}>
      <BorderlessButton onPress={() => alert('back')} >
        <Ionicons style={{ paddingHorizontal: 20 }} name='md-arrow-round-back' size={24} />
      </BorderlessButton>
      <View style={{ position: "absolute", right: 0 }}>
        <HeaderMore />
      </View>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#ddd',
  },
  content: {
    height: 382,
    backgroundColor: '#aaa',
    //margin:8,
  },
  content2: {
    height: 446,
    backgroundColor: '#aaa',
    //margin:8,
  },
  content3: {
    height: 188,
  },

  head: {
    flex: 1,
    //height:72,
    backgroundColor: '#fff',
    flexDirection: "row",
  },

  headAvatarContent: {
    height: 50,
    width: 50,
    borderRadius: 12,
    //backgroundColor: '#aaa',
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,

  },
  headAvatar: {
    height: 50,
    width: 50,
    borderRadius: 12,
    backgroundColor: color.primary.color,
  },
  headerTextContent: {
    flex: 1,
    //backgroundColor: '#fff',
    paddingVertical: 16,
    paddingRight: 16,
  },
  headText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  headSubText: {
    fontSize: 12,
    color: '#888'
  },

  // image content
  body: {
    height: 194,
    width: windowWidth - 40,
    borderRadius: 12,
    backgroundColor: color.primary.color,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 3
  },
  bodyImage: {
    flex: 1,
    height: 194,

    width: windowWidth - 40,
    borderRadius: 12,
  }
})