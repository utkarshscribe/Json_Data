import React, { useState } from 'react';
import { Button, Card } from 'antd';
import SchemaField from './SchemaField'; // this should be a component that renders a single field

const SchemaBuilder = () => {
  const [fields, setFields] = useState([]);

  
  const handleAddField = () => {
    const newField = { key: '', type: 'string', fields: [] };
    setFields([...fields, newField]);
  };

  
  const handleUpdateField = (index, updatedField) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
  };

  
  const handleDeleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  
  const buildJson = (fieldsList) => {
    const result = {};
    fieldsList.forEach((field) => {
      const key = field.key || '';
      if (field.type === 'nested') {
        result[key] = buildJson(field.fields || []);
      } else {
        result[key] = field.type.toUpperCase();
      }
    });
    return result;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Schema Fields">
        {fields.map((field, index) => (
          <SchemaField
            key={index}
            data={field}
            onChange={(updated) => handleUpdateField(index, updated)}
            onDelete={() => handleDeleteField(index)}
          />
        ))}
        <Button type="primary" onClick={handleAddField} style={{ marginTop: '10px' }}>
          + Add Field
        </Button>
      </Card>

      <Card title="Live JSON Preview" style={{ marginTop: 20 }}>
        <pre>{JSON.stringify(buildJson(fields), null, 2)}</pre>
      </Card>
    </div>
  );
};

export default SchemaBuilder;