import {useState, useEffect} from 'react'
import { Button, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    StatusBar, 
    View, 
    Text,
    TextInput, 
    } from 'react-native'


export default function Authenticate({ navigation, sites, setSites, setUser, setCompanyUser}){
    const [ allSites, setAllSites] = useState([])
    const [ completed, setCompleted ] = useState(false)

    useEffect(() => {
        fetch('http://track-my-sand.herokuapp.com/api/mobile_sites')
        .then(resp => resp.json().then(site => {
            setAllSites(site)
            setSites(site)
        }))
    },[setSites])

    function handleLogout() {
        fetch("http://track-my-sand.herokuapp.com/api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
            setCompanyUser(null)
            navigation.navigate("Login")
          }
        });
      } 

    const handleSearch = (value) => {
        const searchSite = allSites.filter(site => {
            return(site.location.toUpperCase().includes(value.toUpperCase()) || site.crew.toUpperCase().includes(value.toUpperCase()))
        })
        setSites(searchSite)
    }

    return(
        <SafeAreaView>
        {/* <Header style={styles.container}> */}
        <View style={styles.header}>
            <View style={styles.header_button_left}>
            <Button
            onPress={() => setCompleted(!completed)}
            title={completed ? "Completed" : "Active"}
            color="white"
            backgroundColor={completed ? "tan" : "rgb(21, 75, 126)"}
            accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <TextInput placeholder="Search" 
            style={styles.text_input} 
            editable={true} 
            onChangeText={text => handleSearch(text)}/>
            <View style={styles.header_button_right}>
          <Button
            title="Logout"
            color="white"
            style={styles.header_button}
            onPress={() => handleLogout()}
          />
          </View>
        </View>
        {/* </Header>  */}
        <SafeAreaView style={styles.safe_view}>
            {completed ? (<></>): (
            <View style={styles.qr_button}>
              <Button title='QR Code Reader' color="black" style={styles.bottom_button} onPress={() => navigation.navigate('QR Scanner')} />
            </View>
            )}
            <ScrollView contentContainerStyle={styles.scroll_view}>
            {completed ? (
                sites.filter(site => site.completed).map(site => {
                    const siteDate = site.start_date.split("-")
                    return(
                        <View style={styles.completed_container} key={site.id}>
                            <Text style={styles.completed_title_text}>{site.location}</Text>
                            <Text style={styles.completed_title_text}>{site.crew}</Text>
                            <Text style={styles.completed_title_text}>{siteDate[1]}/{siteDate[2]}/{siteDate[0]}</Text>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>Total Sand On-Site</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>{(site.total_on_site).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>Total Sand Used</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>{(site.total_sand_used).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>Total Sand Delivered</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>{(site.total_delivered).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>Trash Sand</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>{(site.trash_sand).toLocaleString("en-US")}</Text>
                            </View>
                        </View>
                    )
                })
            ) : (
                sites.filter(site => !site.completed).reverse().map(site => {
                    const siteDate = site.start_date.split("-")
                    return(
                        <View style={styles.container} key={site.id}>
                            <Text style={styles.title_text}>{site.location}</Text>
                            <Text style={styles.title_text}>{site.crew}</Text>
                            <Text style={styles.title_text}>{siteDate[1]}/{siteDate[2]}/{siteDate[0]}</Text>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>Total Sand On-Site</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>{(site.total_on_site).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>Total Sand Used</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>{(site.total_sand_used).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>Total Sand Delivered</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>{(site.total_delivered).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>Trash Sand</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>{(site.trash_sand).toLocaleString("en-US")}</Text>
                            </View>
                        </View>
                    )
                })
            )}
            </ScrollView>
        </SafeAreaView>
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe_view: {
        backgroundColor: 'rgb(45, 45, 45)',
        height: "100%",
    },
    scroll_view:{
        flexGrow: 10,
        padding: 10,
        paddingBottom: 150,
    },
    container: {
      flex: 1,
      backgroundColor: 'rgb(21, 75, 126)',
      alignItems: 'center',
      marginBottom: 16,
      justifyContent: 'center',
      marginTop: 0,
    },
    info_container: {
        flex: 1,
        backgroundColor: 'rgb(21, 75, 126)',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        // marginTop: StatusBar.currentHeight || 0,
      },
    text_input:{
        // marginTop: 0,
        width: 120,
        height: 45,
        padding: 5,
        backgroundColor: "white",
        
    }, 
    header:{
        height: 45,
        backgroundColor: 'rgb(21, 75, 126)',
        flexDirection: 'row',
      justifyContent: 'center',
    flexWrap: 'wrap',
    },
    header_button_left:{
        // marginTop: 0,
        // position: "absolute",
        marginRight: 20,
        width: 110,
        backgroundColor: "rgb(21, 75, 126)",
    },
    header_button_right:{
        marginLeft: 20,
        width: 110,
        backgroundColor: "rgb(21, 75, 126)",
    },
    header_button_center:{
        // marginTop: 0,
        width: 110,
        backgroundColor: "rgb(21, 75, 126)",
    },
    completed_container: {
        flex: 1,
        backgroundColor: 'tan',
        alignItems: 'center',
        marginBottom: 2,
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
      },
      info_complete_container: {
        flex: 1,
        backgroundColor: 'tan',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: "black",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        marginTop: StatusBar.currentHeight || 0,
      },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title_text: {
      fontSize: 32,
      color: "white",
      fontWeight: "bold"
    },
    info_text: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        
      },
      info_complete_text: {
        fontSize: 16,
        fontWeight: "bold",
        
      },
    completed_title_text: {
        fontSize: 32,
        color: "black",
        fontWeight: "bold"
      },
      qr_button:{
        flexGrow: 1,
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 10,
        height: 45,
        borderRadius: 25,
        width: "100%",
        position: 'fixed',
        backgroundColor: "tan",
    },
    bottom_button:{
        position: 'fixed',
        fontWeight: 'bold',
        bottom:0
    },
})