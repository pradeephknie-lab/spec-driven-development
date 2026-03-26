Feature: OrangeHRM HR Manager directory search
  As a QA engineer
  I want to search the OrangeHRM directory by job title
  So that I can capture the current list of HR Managers

  Background:
    Given I open the OrangeHRM login page
    When I sign in with OrangeHRM credentials from the environment
    Then I should land on the dashboard

  @smoke @directory
  Scenario: Filter the directory for HR Managers
    When I open the directory page
    And I filter the directory by job title "HR Manager"
    Then each directory result should have the job title "HR Manager"

  @report @directory
  Scenario: Print and persist the HR Manager directory report
    When I open the directory page
    And I filter the directory by job title "HR Manager"
    Then I print the HR Manager list
    And I save the HR Manager report artifact
