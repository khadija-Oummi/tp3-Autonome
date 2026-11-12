import React from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';

type Evenement = {
  id: string;
  titre: string; 
  categorie: string;
  capacite: number;
  inscrits: number;
};

const evenements:Evenement[] = [
  { id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 25 },
  { id: 'E02', titre: 'Conférence IA', categorie: 'Conférence', capacite: 70, inscrits: 52 },
  { id: 'E03', titre: 'Sécurité mobile', categorie: 'Atelier', capacite: 20, inscrits: 17 },
  { id: 'E04', titre: 'Design UI', categorie: 'Atelier', capacite: 18, inscrits: 9 },
  { id: 'E05', titre: 'Forum projets', categorie: 'Rencontre', capacite: 50, inscrits: 49 },
  { id: 'E06', titre: 'Découverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24 },
];


function placesRestantes(e: Evenement) {
let places = e.capacite - e.inscrits;
if (places < 0) {
 return 0;
} else {
return places;
}}
const places = evenements.map(e => placesRestantes(e));


function statutEvenement(e:Evenement){
 let statut=placesRestantes(e);
 if (statut === 0) {
return "Complet"; }
else if (statut >= 1 && statut <= 3) {
return "Presque complet";}
 else {
 return "Ouvert";
}}



const nbrevenementComplet = evenements.filter(e => statutEvenement(e) === 'Complet');
const nbrAvecplaces = evenements.filter( e => placesRestantes(e) > 0);
const sommePlacesRestant = places.reduce((acc, p) => acc + p, 0);

const ateliersDisponibles = evenements.filter(e => e.categorie === "Atelier" && placesRestantes(e) > 0);

const mode = 'tous';
const listeAffichee =mode === "tous"? evenements: ateliersDisponibles;


type Statut = 'Complet'| 'Presque complet' |'Ouvert';
type BadgeEtatprops = {
  statut: Statut;};
function BadgeEtat({ statut }: BadgeEtatprops) {
return (
<View style={[
styles.badge,
statut === "Complet"? styles.Complet: statut === "Presque complet"? styles.Presquecomplet
: styles.Ouvert ]}>

<Text style={styles.texte}> {statut}</Text>
</View>
);}

type carteprops = {evenement: Evenement;};
function CarteEvenement({ evenement }: carteprops) {
const { titre, categorie } = evenement;
const places = placesRestantes(evenement);
const statut = statutEvenement(evenement);

return (
<View style={styles.carte}>
<View style={styles.enteteCarte}>
<Text style={styles.titreCarte}>{titre}</Text>
<BadgeEtat statut={statut} /></View>

<Text style={styles.information}> Catégorie : {categorie} </Text>
<Text style={styles.information}> Places restantes : {places}</Text>
</View>

);}


type BlocStatistiqueprops = {libelle: string; nombre: number;};
function BlocStatistique({ libelle, nombre }: BlocStatistiqueprops) {
  return (
<View style={styles.box}>
<Text style={styles.nombre}> {nombre} </Text>
<Text style={styles.libelle}> {libelle} </Text>
</View>

);}


export default function App() {
  const total = evenements.length;
  const nbrcomplet = nbrevenementComplet.length;
  const nbrplaces = nbrAvecplaces.length;
  const totalPlacesRestantes = sommePlacesRestant;

  return (

<FlatList data={evenements} keyExtractor={(event) => event.id}
renderItem={({ item }) => (
<CarteEvenement evenement={item} />)}

ListHeaderComponent={
<View>
<Text style={styles.titre}> Campus Agenda </Text>
<Text style={styles.sousTitre}> evenements du campus </Text>
<View style={styles.container}>

<BlocStatistique libelle="nombre total évenement " nombre={total} />
<BlocStatistique libelle=" nombre des évenement Complets" nombre={nbrcomplet} />
 <BlocStatistique libelle="nombre évenement Avec des places" nombre={nbrplaces} />
 <BlocStatistique libelle="nombre des Places restantes" nombre={totalPlacesRestantes} />
 
 </View>
<Text style={styles.texteResume}>  le Mode d'affiché : {mode} </Text>
</View>}

ListEmptyComponent={
<Text style={styles.messageVide}> Aucun événement disponible. </Text>
}
  contentContainerStyle={styles.ecran} />

  );}


const styles = StyleSheet.create({
ecran: { 
paddingTop: 56,paddingBottom: 30,paddingHorizontal: 18,backgroundColor: 'lightpink',
 flexGrow: 1
   },

  titre: { 
    fontSize: 35,fontWeight: 'bold',color: 'darkblue',textAlign:'center',
  },

  sousTitre: {
    color: 'gray',fontSize: 20,marginTop: 15,fontWeight: 'bold', marginBottom: 30,
    textAlign:'center',},

  container: { flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'space-between', padding: 12,
    borderRadius: 14, backgroundColor: 'white', marginBottom: 18, gap: 8
  },

  box: {
    width: '48%', padding: 12, backgroundColor: 'lightgray', borderRadius: 10, alignItems: 'center'
  },

  nombre: { fontSize: 22, fontWeight: 'bold', color: '#00235C'},
  libelle: { color: 'blask',fontSize: 12},

  texteResume: {color: 'gray',fontWeight: '600',fontSize: 16,marginBottom: 12},

  carte: {
    padding: 16,backgroundColor: 'white',borderRadius: 12,marginBottom: 12,borderWidth: 1,
    borderColor: 'white',},

  enteteCarte: { flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between',
    marginBottom: 8 },

  titreCarte: {fontWeight: 'bold',fontSize: 18,color: 'blak',flexShrink: 1},

  information: { color: 'gray',marginTop: 3},

  badge: {
    paddingHorizontal: 10,paddingVertical: 5,borderRadius: 30,marginLeft: 8 },

  Complet: {backgroundColor: '#FFCCCC',},
  Presquecomplet: {backgroundColor: '#FFD8A8',},
  Ouvert: { backgroundColor: 'lightgreen',},

  texte: {fontSize: 12,color: 'blue', fontWeight: 'bold' },

  messageVide: {textAlign: 'center',color: 'gray',marginTop: 25,fontSize: 16}
});