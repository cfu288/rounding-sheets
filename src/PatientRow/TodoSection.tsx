import { View, Text } from "@react-pdf/renderer";
import { getTemplate, KnownTemplateIds } from "../const";
import { StyleSheet } from "@react-pdf/renderer";
import { Patient } from "../Patient";

const todoStyles = StyleSheet.create({
  todoFlexContainer: {
    padding: "2px",
    flex: 1,
    width: "100%",
  },
  todoText: {
    fontWeight: 700,
    width: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    borderTop: "0.5px solid black",
    width: "100%",
    padding: "2px",
  },
  todoDescription: {
    paddingHorizontal: "2px",
    paddingVertical: "2px",
  },
  todoBlank: {
    paddingHorizontal: "2px",
    paddingVertical: "2px",
    borderBottom: "0.5px dotted grey",
    width: "100%",
  },
  dailyTodoDescription: {
    paddingRight: "8px",
  },
  todoContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "50%",
  },
});

interface TodoSectionProps {
  patient: Patient;
  templateId: KnownTemplateIds;
}

export const TodoSection: React.FC<TodoSectionProps> = ({
  patient,
  templateId,
}) => {
  const todosCount = patient.todos?.length || 0;
  const template = getTemplate({
    template_id: templateId,
    custom_override_templates: patient.display_template_overrides,
  });
  const blankLinesCount = Math.max(
    0,
    (template.patientsPerPage === 1 || template.displaySize === "2x" ? 10 : 5) -
      todosCount
  );

  return (
    <View style={todoStyles.todoContainer}>
      <View style={todoStyles.todoFlexContainer}>
        <Text style={todoStyles.todoText}>Todo:</Text>
        {patient.todos?.map((todo, i) => (
          <View key={i}>
            <Text style={todoStyles.todoDescription}>
              [{"  "}] {todo.description}
            </Text>
          </View>
        ))}
        {Array.from({ length: blankLinesCount }).map((_, i) => (
          <View key={i}>
            <Text style={todoStyles.todoBlank}>[{"  "}]</Text>
          </View>
        ))}
      </View>
      {template.dailyTodoList && (
        <View style={todoStyles.footer}>
          {template.dailyTodoList?.map((todo, i) => (
            <View key={i}>
              <Text style={todoStyles.dailyTodoDescription}>
                [{"  "}] {todo.description}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
