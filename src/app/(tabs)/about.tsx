import EpnColors from '@/constants/epn-colors';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen(){
    return(
        <View style={styles.container}>
           <View style={styles.card}>
               <Text style={styles.title}>Estados EPN</Text>
               <Text style={styles.description}>Muestra de colores de estado</Text>
               <View style={styles.statusRow}>
                   <View style={[styles.status, styles.approved]}>
                       <Text style={[styles.statusText, styles.darkStatusText]}>Aprobado</Text>
                   </View>
                   <View style={[styles.status, styles.supletorio]}>
                       <Text style={[styles.statusText, styles.darkStatusText]}>Supletorio</Text>
                   </View>
                   <View style={[styles.status, styles.failed]}>
                       <Text style={[styles.statusText, styles.lightStatusText]}>Reprobado</Text>
                   </View>
               </View>
           </View>
        </View>
    );
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: EpnColors.background,
        justifyContent:'center',
        alignItems: 'center',
        padding: 24,
    },
    card: {
        width: '100%',
        maxWidth: 360,
        minHeight: 120,
        backgroundColor: EpnColors.surface,
        borderColor: EpnColors.border,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 24,
    },
    title:{
        color: EpnColors.text,
        fontSize: 20,
        fontWeight: '600',
    },
    description: {
        color: EpnColors.secondaryText,
        fontSize: 14,
        marginTop: 6,
    },
    statusRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 20,
    },
    status: {
        flex: 1,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        paddingHorizontal: 4,
        paddingVertical: 8,
    },
    approved: {
        backgroundColor: EpnColors.aprobado,
    },
    supletorio: {
        backgroundColor: EpnColors.supletorio,
    },
    failed: {
        backgroundColor: EpnColors.destructive,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    darkStatusText: {
        color: EpnColors.text,
    },
    lightStatusText: {
        color: EpnColors.surface,
    },
});