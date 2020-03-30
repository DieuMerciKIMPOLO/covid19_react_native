import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, ActivityIndicator, View,Picker,ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
export default function App() {
  const [selectedValue, setSelectedValue] = useState("Senegal");
  const [isLoaded,setisLoaded]=useState(false)
  const [data, setData] = useState(null);
  const countries=[
    "Senegal","Canada","Congo (Brazzaville)"
  ]
  const handleChange=(country)=>{
    setSelectedValue(country);
    setData(null)
    setisLoaded(true)
    fetch(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=${country}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-rapidapi-host':'covid-19-coronavirus-statistics.p.rapidapi.com',
        'x-rapidapi-key':'c9cd763097mshfb6a67bcac52facp10fecbjsnb087dddff7d7'
      }}).then((response) => response.json())
      .then((json) => {
         setData(json.data.covid19Stats[0])
         setisLoaded(false)
        })
      .catch((error) => {
        console.error(error)
        setisLoaded(false)
      })
      .finally(() => console.log(data));
  }
  useEffect(() => {
    setSelectedValue(selectedValue);
    setisLoaded(true)
    fetch(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=${selectedValue}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-rapidapi-host':'covid-19-coronavirus-statistics.p.rapidapi.com',
        'x-rapidapi-key':'c9cd763097mshfb6a67bcac52facp10fecbjsnb087dddff7d7'
      }}).then((response) => response.json())
      .then((json) => {
         setisLoaded(false)
         setData(json.data.covid19Stats[0])
        })
      .catch((error) => {
        console.error(error)
        setisLoaded(false)
      })
  });

  return (
    <ScrollView style={styles.scroll}>
<View style={styles.container}>
      <Text>COVID 19 CHECKER!</Text>
      <Picker
      selectedValue={selectedValue}
      style={{ height: 50, width: 150 }}
      onValueChange={(itemValue, itemIndex) => handleChange(itemValue)}

    >
      {
        countries.map((item,key)=>{
          return <Picker.Item label={item} value={item} key={key}/>
        })
      }
    </Picker>
    </View> 
    {data?
      <Card style={styles.card} title={data.country} >
            <ListItem key={data.confirmed}  title={`Confirmed         :${data.confirmed}`} />
            <ListItem key={data.recovered}  title={`Recovered         :${data.recovered}`} />
            <ListItem key={data.deaths}     title={`Deaths               :${data.deaths}`}/>
            <ListItem key={data.lastUpdate} title={`Last Update       :${data.lastUpdate}`} />
    </Card>:isLoaded? <ActivityIndicator size="large" color="#0000ff" />:null}   
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    flex: 2,
    width:'100%',
    height:450
  },
  scroll:{
    paddingTop:100
  }
});
