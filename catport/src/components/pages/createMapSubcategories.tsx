import React, { useState } from 'react';
import { Select, Form, Input, Button, Typography, Layout, Row, Col, notification, Table } from 'antd';
import { PlusOutlined, DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;
const { Content } = Layout;

const subcategories = [
  "Shop Mechanics",
  "Instrument Techs 1",
  "Instrument Techs 2",
  "Operators 1",
  "Operators 2",
  "Engineer - Type 1",
  "Engineer - Type 2",
  "Engineer - Type 3",
  "Others"
];

const MapSubcategories: React.FC = () => {
  const [selectedDashboards, setSelectedDashboards] = useState<string[]>([]);
  const [customGroups, setCustomGroups] = useState<{ name: string; subcategories: string[] }[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const handleDashboardChange = (selected: string[]) => {
    setSelectedDashboards(selected);
  };

  const handleGroupSubcategoriesChange = (index: number, value: string[]) => {
    const updatedGroups = [...customGroups];
    updatedGroups[index].subcategories = value;
    setCustomGroups(updatedGroups);
  };

  const addCustomGroup = () => {
    setCustomGroups([...customGroups, { name: '', subcategories: [] }]);
  };

  const updateCustomGroupName = (index: number, name: string) => {
    const updatedGroups = [...customGroups];
    updatedGroups[index].name = name;
    setCustomGroups(updatedGroups);
  };

  const saveMappedSubcategories = () => {
    notification.success({
      message: 'Mapping Subcategories Success',
      description: 'Your custom subcategory mappings have been saved successfully.',
      placement: 'topRight',
      duration: 5,
    });
  };

  const deleteCustomGroup = (index: number) => {
    const updatedGroups = [...customGroups];
    updatedGroups.splice(index, 1);
    setCustomGroups(updatedGroups);
  };

  const toggleGroupExpansion = (groupName: string) => {
    if (expandedGroups.includes(groupName)) {
      setExpandedGroups(expandedGroups.filter(name => name !== groupName));
    } else {
      setExpandedGroups([...expandedGroups, groupName]);
    }
  };

  const renderCustomGroupForm = () => {
    return customGroups.map((group, index) => (
      <Row key={index} gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={8}>
          <Input
            placeholder="Group Name"
            value={group.name}
            onChange={e => updateCustomGroupName(index, e.target.value)}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={14}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select subcategories"
            value={group.subcategories}
            onChange={(value) => handleGroupSubcategoriesChange(index, value)}
            options={subcategories.map(sub => ({ label: sub, value: sub }))}
          />
        </Col>
        <Col span={2}>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteCustomGroup(index)}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
    ));
  };

  const renderMappedSubcategories = () => {
    const columns = [
      {
        title: 'Group Name',
        dataIndex: 'name',
        key: 'name',
        render: (name: string) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text strong>{name}</Text>
            <Button
              type="link"
              icon={expandedGroups.includes(name) ? <UpOutlined /> : <DownOutlined />}
              onClick={() => toggleGroupExpansion(name)}
              style={{ marginLeft: '8px' }}
            />
          </div>
        ),
      },
    ];

    const data = customGroups.map(group => ({
      key: group.name,
      name: group.name,
      subcategories: group.subcategories,
    }));

    return (
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: record => (
            <div style={{ marginLeft: '24px' }}>
              <Text>{record.subcategories.join(', ')}</Text>
            </div>
          ),
          rowExpandable: record => expandedGroups.includes(record.name),
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedGroups([...expandedGroups, record.name]);
            } else {
              setExpandedGroups(expandedGroups.filter(name => name !== record.name));
            }
          },
        }}
        pagination={false}
      />
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Map Subcategories</Title>
        <Form layout="vertical" style={{ margin: '20px' }}>
          <Form.Item label="Select Dashboard" name="dashboards">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select dashboards"
              onChange={handleDashboardChange}
              value={selectedDashboards}
            >
              <Option value="CAT-001-D1001">CAT-001-D1001</Option>
              <Option value="CAT-001-D1002">CAT-001-D1002</Option>
              <Option value="CAT-001-D1003">CAT-001-D1003</Option>
            </Select>
          </Form.Item>
          {renderCustomGroupForm()}
          <Button type="dashed" onClick={addCustomGroup} icon={<PlusOutlined />} style={{ width: '100%' }}>
            Add Custom Group
          </Button>
          <Button type="primary" onClick={saveMappedSubcategories} style={{ marginTop: '16px', width: '100%' }}>
            Save Mapped Subcategories
          </Button>
        </Form>
        {customGroups.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            {renderMappedSubcategories()}
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default MapSubcategories;