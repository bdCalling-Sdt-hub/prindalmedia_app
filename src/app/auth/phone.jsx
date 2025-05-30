import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "../../lib/tailwind";

const countries = [
  { code: "US", name: "United States", dial_code: "+1", flag: "🇺🇸" },
  { code: "BD", name: "Bangladesh", dial_code: "+880", flag: "🇧🇩" },
  { code: "IN", name: "India", dial_code: "+91", flag: "🇮🇳" },
  { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dial_code: "+1", flag: "🇨🇦" },
];

export default function Phone() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const validatePhoneNumber = (number) => {
    // Check if number length >= 6 and <= 14 for demo purposes
    const digitsOnly = number.replace(/\D/g, "");
    return digitsOnly.length >= 6 && digitsOnly.length <= 14;
  };

  const handleSubmit = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");

    Alert.alert(
      "Phone Submitted",
      `${selectedCountry.flag} ${selectedCountry.dial_code} ${phoneNumber}`
    );

    router.push("/(tab)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={tw` bg-primaryBg flex-1  `}>
        {/* <BackButton
              onPress={() => {
                router?.back();
              }}
              title={"Change password"}
            /> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={tw`p-[4%]  justify-center flex-1 `}>
            <Text
              style={tw`text-7 text-[#121212] font-inter-700 dark:text-white text-center mb-11 `}
            >
              Enter your phone
            </Text>

            {/* Country Selector */}
            <TouchableOpacity
              style={tw`flex-row items-center mb-4 border border-gray-300 rounded-md p-3`}
              onPress={() => setModalVisible(true)}
            >
              <Text style={tw`text-2xl mr-3`}>{selectedCountry.flag}</Text>
              <Text style={tw`text-base`}>
                {selectedCountry.name} ({selectedCountry.dial_code})
              </Text>
            </TouchableOpacity>

            {/* Phone Input */}
            <View
              style={tw`flex-row items-center border border-gray-300 rounded-md p-1 mb-2`}
            >
              <View style={tw`flex-1 flex-row items-center gap-3`}>
                <View>
                  <Text style={tw`text-lg text-gray-800`}>
                    {selectedCountry.dial_code}
                  </Text>
                </View>
                <View style={tw`h-6 border-r border-gray-300`} />
              </View>
              <TextInput
                style={tw`flex-1 text-base`}
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(text) =>
                  setPhoneNumber(text.replace(/[^0-9]/g, ""))
                }
                maxLength={14}
              />
            </View>

            {error ? <Text style={tw`text-red-500 mb-2`}>{error}</Text> : null}

            <TouchableOpacity
              style={tw`bg-orange py-3 rounded-md items-center`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-white font-bold`}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-textPrimary py-3 rounded-md items-center mt-3`}
              onPress={() => {
                router.push("/(tab)");
              }}
            >
              <Text style={tw`text-white font-bold`}>Skip</Text>
            </TouchableOpacity>

            {/* Country Picker Modal */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
            >
              <View style={tw`flex-1 bg-black bg-opacity-50 justify-center`}>
                <View style={tw`bg-white rounded-lg mx-5 p-5 max-h-96`}>
                  <Text style={tw`text-xl font-bold mb-4`}>Select Country</Text>

                  <FlatList
                    data={countries}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                      <Pressable
                        style={tw`flex-row items-center py-2`}
                        onPress={() => {
                          setSelectedCountry(item);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={tw`text-2xl mr-4`}>{item.flag}</Text>
                        <View>
                          <Text style={tw`text-base font-semibold`}>
                            {item.name}
                          </Text>
                          <Text style={tw`text-sm text-gray-500`}>
                            {item.dial_code}
                          </Text>
                        </View>
                      </Pressable>
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={tw`border-b border-gray-200`} />
                    )}
                  />

                  <TouchableOpacity
                    style={tw`mt-4 bg-gray-300 py-2 rounded-md items-center`}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View tyle={tw``}>
              <TouchableOpacity onPress={() => router.push(`(drawer)/Mission`)}>
                <Text
                  style={tw`text-orange underline font-inter-600  text-center mt-10 `}
                >
                  Our Mission
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
