- name: Ensure app directory exists
  file:
    path: "{{ app_dir }}"
    state: directory
    mode: '0755'

- name: Copy docker-compose file
  copy:
    src: docker-compose.yml
    dest: "{{ app_dir }}/docker-compose.yml"

- name: Start the application with Docker Compose
  command: docker-compose up -d
  args:
    chdir: "{{ app_dir }}"
