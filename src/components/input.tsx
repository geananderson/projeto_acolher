import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return <TextInput style={style.input} {...rest} />;
}

const style = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 12,
  },
});
