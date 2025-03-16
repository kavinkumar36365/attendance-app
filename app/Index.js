import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignIn() {
  const [rememberMe, setRememberMe] = React.useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign In</Text>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.descriptionText}>Please sign in to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.options}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={rememberMe}
              onValueChange={setRememberMe}
            />
            <Text style={styles.label}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signinButton} onPress={() => router.push('/Timetable')}>
          <Text style={styles.signinButtonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.registerLink}>
          Don't have an Account?{' '}
          <Text style={styles.registerLinkInner} onPress={() => router.push('/Register')}>
            Register
          </Text>
        </Text>
        <View style={styles.divider}>
          <Text style={styles.dividerText}>OR CONNECT WITH</Text>
        </View>
        <TouchableOpacity style={styles.microsoftButton}>
          <Image style={styles.microsoftLogo} source={require('../assets/microsoft-logo.png')} />
          <Text style={styles.microsoftButtonText}>Microsoft</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: 'green',
    width: '100%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainContent: {
    width: '100%',
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
  },
  forgotPassword: {
    color: 'green',
  },
  signinButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  signinButtonText: {
    color: 'white',
    fontSize: 16,
  },
  registerLink: {
    textAlign: 'center',
    marginBottom: 20,
  },
  registerLinkInner: {
    color: 'green',
  },
  divider: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerText: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    color: '#666',
  },
  microsoftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  microsoftLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  microsoftButtonText: {
    fontSize: 16,
  },
});