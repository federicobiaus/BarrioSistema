from pathlib import Path
path = Path('src/app/login/page.tsx')
text = path.read_text(encoding='utf-8')
start = text.index('  return (')
end = text.rindex('  );\n}\n') + len('  );\n}\n')
replacement = '''  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl shadow-lg" bordered={False}>
        <div className="mb-6 text-center">
          <Title level={2}>Barrio Privado</Title>
          <Text type="secondary">Sistema de Accesos</Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Form
          layout="vertical"
          name="login"
          onFinish={handleLogin}
          requiredMark={False}
          className="space-y-4"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: True, message: 'Ingresa tu email' }, { type: 'email', message: 'Ingresa un email válido' }]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@test.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: True, message: 'Ingresa tu contraseña' }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
'''
text = text[:start] + replacement + text[end:]
path.write_text(text, encoding='utf-8')
print('updated')
