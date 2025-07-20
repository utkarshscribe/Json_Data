import React from 'react';
import { Input, Select, Button, Space, Card } from 'antd';

const { Option } = Select;

const SchemaField = ({ data, onChange, onDelete }) => {
  
  const handleKeyChange = (e) => {
    onChange({ ...data, key: e.target.value });
  };

  
  const handleTypeChange = (value) => {
    const updatedField = {
      ...data,
      type: value,
    };

    if (value === 'nested') {
      updatedField.fields = data.fields || [];
    } else {
      delete updatedField.fields; 
    }

    onChange(updatedField);
  };

  
  const addSubField = () => {
    const newSubFields = [...(data.fields || []), { key: '', type: 'string' }];
    onChange({ ...data, fields: newSubFields });
  };

  
  const updateSubField = (index, updatedSubField) => {
    const newFields = [...data.fields];
    newFields[index] = updatedSubField;
    onChange({ ...data, fields: newFields });
  };

  
  const deleteSubField = (index) => {
    const newFields = [...data.fields];
    newFields.splice(index, 1);
    onChange({ ...data, fields: newFields });
  };

  return (
    <Card size="small" style={{ marginBottom: 10 }}>
      <Space>
        <Input
          placeholder="Field Name"
          value={data.key}
          onChange={handleKeyChange}
          style={{ width: 200 }}
        />

        <Select value={data.type} onChange={handleTypeChange} style={{ width: 120 }}>
          <Option value="string">String</Option>
          <Option value="number">Number</Option>
          <Option value="boolean">Boolean</Option>
          <Option value="array">Array</Option>
          <Option value="object">Object</Option>
          <Option value="nested">Nested</Option>
        </Select>

        <Button danger onClick={onDelete}>
          Delete
        </Button>
      </Space>

      
      {data.type === 'nested' && (
        <div style={{ marginTop: 10, marginLeft: 40 }}>
          {data.fields?.map((field, index) => (
            <SchemaField
              key={index}
              data={field}
              onChange={(updated) => updateSubField(index, updated)}
              onDelete={() => deleteSubField(index)}
            />
          ))}

          <Button type="dashed" onClick={addSubField}>
            + Add Subfield
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SchemaField;
