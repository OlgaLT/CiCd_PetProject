FROM cypress/included

# Set working directory
WORKDIR /e2e

# Ensure Java dependencies directories are in place to avoid errors
RUN mkdir -p /usr/share/man/man1/ && touch /usr/share/man/man1/java.1.gz.dpkg-tmp

# Update package lists, upgrade packages, and install Java dependencies
RUN apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get install -y default-jre-headless ca-certificates-java curl tar && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Allure
RUN curl -o allure-2.13.8.tgz -Ls https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.13.8/allure-commandline-2.13.8.tgz && \
    tar -zxvf allure-2.13.8.tgz -C /opt/ && \
    ln -s /opt/allure-2.13.8/bin/allure /usr/bin/allure && \
    rm allure-2.13.8.tgz

# Copy the package.json to install Cypress dependencies
COPY package.json /e2e

# Install Cypress dependencies (handling peer dependencies)
RUN npm install --legacy-peer-deps --verbose

# Copy all project files to the container
COPY . .

# Make sure the test execution script has execution permission
RUN chmod +x /e2e/run-tests.sh

# Define the entry point for the container (customize based on your script or tests)
ENTRYPOINT ["/e2e/run-tests.sh"]