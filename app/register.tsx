import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import ErrorMessage from "@/components/auth/ErrorMessage";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterScreen() {
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Lozinke se ne podudaraju.");
      return;
    }

    try {
      await register(email, password);
      setErrorMessage("");
      router.replace("/(drawer)/(tabs)/auth");
    } catch (error: any) {
      setErrorMessage(error.message ?? "Registracija nije uspjela.");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Ionicons name="person-add-outline" size={72} color="#2563EB" />
        <Text style={styles.title}>Registracija</Text>

        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <AuthInput
          placeholder="Lozinka"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <AuthInput
          placeholder="Potvrdi lozinku"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <ErrorMessage message={errorMessage} />

        <AuthButton title="Kreiraj nalog" onPress={handleRegister} />
        <AuthButton
          title="Već imaš nalog? Prijavi se"
          onPress={() => router.back()}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginTop: 10,
    marginBottom: 18,
  },
});
