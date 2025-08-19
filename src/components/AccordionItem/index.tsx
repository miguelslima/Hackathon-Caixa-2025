import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Collapsible from "react-native-collapsible";

export function AccordionItem({ title, body }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{ marginVertical: 10, padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }
    }>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}> {title} </Text>
      </TouchableOpacity>
      < Collapsible collapsed={!expanded}>
        <Text style={{ marginTop: 8 }}> {body} </Text>
      </Collapsible>
    </View>
  );
}
